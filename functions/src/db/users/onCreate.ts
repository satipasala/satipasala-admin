import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getCustomClaims } from '../../utils/objectUtils';
export const dbUsersOnCreate = functions.firestore
  .document('users/{userId}').onCreate((change, context) => {
    return new Promise((resolve, reject) => {
      const newUser = change.data();
      change.ref.set({
        courseSubscriptions: {},
        createdAt: new Date().toISOString(),
        password:null //for the security reasons. we dont need password from here on.
      }, { merge: true }).then(() => {
        admin.auth().getUser(newUser.email).then(value => {
          if(value == null){
            admin.auth().createUser({
              email: newUser.email,
              emailVerified: false,
              password: newUser.password,
              displayName: newUser.displayName
            }).then(userRecord => {
              // See the UserRecord reference doc for the contents of userRecord.
              console.log('Successfully created new user:', userRecord.uid);
              //newUser =  updateCourseSubscriptions(newUser);
              //updates the user's courses from role
              updateNewAuthUser(newUser,userRecord,resolve,reject);
            }).catch(error => {
              console.error('Error creating auth user:', error);
              reject('Error creating auth user:' + error);
            });
          }else{
            updateNewAuthUser(newUser,value,resolve,reject);
          }
        }).catch((error) => {
          console.error('Error getting new user:');
          reject('Error getting new user:' + error)
        })

      }).catch((error) => {
        console.error('Error creating new user:');
        reject('Error creating new user:' + error)
      });
    });
  });

function updateNewAuthUser(newUser,userRecord,resolve,reject){
  admin.firestore().collection('users').doc(newUser.email).update(
    {
      id: userRecord.email,
      providerId: "password",
      email: userRecord.email,
      phoneNumber: userRecord.phoneNumber ? userRecord.phoneNumber : "",
      photoURL: userRecord.photoURL ? userRecord.photoURL : "",
      uid: userRecord.uid,
      updatedAt: new Date().toISOString(),
      courseSubscriptions: getCourseSubscriptions(newUser),
      eventSubscriptions:{}
    }
  ).then(() => {
    console.log("course subscriptions added to user");
    admin.auth().createCustomToken(userRecord.uid, getCustomClaims(newUser)).then(() => {
      resolve({ executionStatus: 'success', executionMsg: 'user created successfully' });
    }).catch(error => {
      console.error('Error setting auth claims:', error);
      reject('Error setting auth claims:' + error);
    });
  }).catch((error) => {
    console.error('Error updating user  courses:', error);
    reject('Error updating user  courses:' + error);
  });
}


function getCourseSubscriptions(userData) {
  if (!userData.courseSubscriptions) {
    userData.courseSubscriptions = {};
  }
  if (userData.userRole.courses) {

    if (userData.userRole && userData.userRole.courses) {
      Object.keys(userData.userRole.courses).forEach(key => {
        const course = userData.userRole.courses[key];
        if (course) {
          userData.courseSubscriptions[key] = course;
          console.log("[Added] new course %s to user", userData.email);
        }
      })
    }

  } else {
    console.log("No courses attached to user role");
  }

  return userData.courseSubscriptions;
}

