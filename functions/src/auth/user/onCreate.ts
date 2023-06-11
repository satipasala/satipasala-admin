import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

/*// Adds a message that welcomes new users into the system
export const authUserOnCreate = functions.auth.user().onCreate((user) => {
  return new Promise((resolve, reject) => {
    // get users collection
    const db = admin.firestore();
    db.collection("users").doc(user.email.toLowerCase()).get().then(snap => {
      const dbUser = snap.data();
      // find user is exists on firestore and should be execute on Admin user create another user
      if (snap.exists) {
        console.log("user exists:", snap.data().email);
        const provider = user.providerData.pop();
        if (provider && provider.providerId === "password") { // Create new user in DB only if auth provider is email/password

        } else {
          console.log("user provider id is not password.deleting user:", user.email);
          deleteSelfSignedUser(user,resolve,reject);
        }
      }else {
        console.log("no user found. deleting auth record for:",user.email)
        deleteSelfSignedUser(user,resolve,reject);
      }
    }).catch(error => {
      console.error("Error in sign up.deleting user:",error);
      deleteSelfSignedUser(user,resolve,reject);
    });
  });
});*/


function deleteSelfSignedUser(user, resolve, reject) {
  // Remove auth user (This auth user was not created by an admin, but a self signed one)
  console.log("Deleting .... Self auth user " + user.email);
  admin.auth().deleteUser(user.uid).then(success => {
    console.log("Self auth user " + user.email + " is deleted.");
    resolve("user deleted");
  }, error => {
    console.error("Auth user deletion failed!", error);
    reject(error);
  });
}

// Adds a message that welcomes new users into the system
export const authUserOnCreate = functions.auth.user().onCreate((user) => {
  return new Promise((resolve, reject) => {
    // get users collection
    const db = admin.firestore();
    db.collection("users").doc(user.email.toLowerCase()).get().then(snap => {
      const dbUser = snap.data();
      // find user is exists on firestore and should be execute on Admin user create another user
      if (!snap.exists) {
        console.log("no user found. creating user record for:", user.email);
        //get student role
        db.collection("roles").doc('STUDENT').get().then(roleSnap => {
          const userRole = roleSnap.data();
          const jsonUser = JSON.parse(JSON.stringify(user))
          if (roleSnap.exists) {
            const userRecord = {
              ...jsonUser,
              userName: user.email,
              userRole: userRole
            }
            db.collection('users').doc(user.email).set(userRecord)
              .then((ref) => {
                console.log('users create [Success] User created successfully. Ref => %s', user.email);
                resolve('users create [Success]')
              })
              .catch(error => {
                console.log('users create [Error] Failed to create user, Error => %s', error);
                deleteSelfSignedUser(user,resolve,reject);
              });
          }else{
            console.log("no 'STUDENT' role found. deleting auth record for:",user.email)
            deleteSelfSignedUser(user,resolve,reject);
          }
        }).catch(error => {
          console.log("error getting 'STUDENT' role. deleting auth record for:{} error :{}",user.email,error)
          deleteSelfSignedUser(user,resolve,reject);
        })
      }
    }).catch(error => {
      console.error("Error in sign up.deleting user:", error);
      deleteSelfSignedUser(user,resolve,reject);
    });
  });
});
