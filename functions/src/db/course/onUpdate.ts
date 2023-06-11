import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const dbCourseOnUpdate = functions.firestore.document('courses/{courseDoc}')
  .onUpdate((change, context) => {

    const course = change.after.data();
    if (change.after.id === change.before.id) {
      const db = admin.firestore();

      // Updating relevant courses in courseSubscription collection where the course haven't started yet
      const courseSubscriptionsPromise = new Promise((resolve, reject) => {
        console.log("dbCourseOnUpdate starting changes to courseSubscription collection");
        db.collection("courseSubscriptions")
          .where("course.id", '==', course.id).where("course.status", "==", "notstarted").get()
          .then(snap => {
            snap.forEach((doc) => {
              const courseSubscription = doc.data();
              doc.ref.update({course: course}).then(() => {
                console.log("dbCourseOnUpdate on courseSubscription %s success", courseSubscription.id);
              }).catch((error) => {
                console.error("dbCourseOnUpdate on courseSubscription %s failed :", courseSubscription.id, error);
              });
            });
            resolve('courseSubscriptions updated');
          }).catch(error => {
          console.error('Error performing courseSubscriptions collection query on dbCourseOnUpdate : ', error);
          reject('courseSubscriptions update failed');
        });
      });


      // Updating relevant courses in roles collection where the course haven't started yet
      const rolesPromise = new Promise((resolve, reject) => {
        console.log("dbCourseOnUpdate starting changes to roles collection");
        db.collection("roles")
          .where(`courses.${course.id}.id`, '==', course.id).get()
          .then(snap => {
            snap.forEach((doc) => {
              const role = doc.data();
              role.courses[course.id] = course;
              doc.ref.update({courses: role.courses}).then(() => {
                console.log("dbCourseOnUpdate on rolesBatch success for role:", role.id);
              }).catch((error) => {
                console.error("dbCourseOnUpdate on rolesBatch failed for role : ", role.id, error);
              });
            });
            resolve('role updated');
          }).catch(error => {
          console.error('Error performing roles collection query on dbCourseOnUpdate : ', error);
          reject('role update failed');
        });
      });

      // Updating relevant courses in users collection where the course haven't started yet
      const usersPromise = new Promise((resolve, reject) => {
        console.log("dbCourseOnUpdate starting changes to users collection");
        db.collection("users")
          .where(`courseSubscriptions.${course.id}.id`, '==', course.id)
          .where(`courseSubscriptions.${course.id}.status`, '==', "notstarted").get()
          .then(snap => {
            snap.forEach((doc) => {
              const user = doc.data();
              user.courseSubscriptions[course.id] = course;
              doc.ref.update({courseSubscriptions: user.courseSubscriptions}).then(() => {
                console.log("dbCourseOnUpdate on user %s success", user.email);
              }).catch((error) => {
                console.error("dbCourseOnUpdate on user %s failed :", user.email, error);
              });
            });
            resolve('users updated');
          }).catch(error => {
          console.error('Error performing users collection query on dbCourseOnUpdate : ', error);
          reject('users update failed');
        });
      });

      //updating relevant programs

      const programsPromise = new Promise((resolve, reject) => {
        console.log("dbCourseOnUpdate starting changes to programs collection");
        db.collection("programs")
          .where(`courses.${course.id}.id`, '==', course.id).get()
          .then(snap => {
            snap.forEach((doc) => {
              const progra = doc.data();
              progra.courses[course.id] = course;
              doc.ref.update({courses: progra.courses}).then(() => {
                console.log("dbCourseOnUpdate on rolesBatch success for role:", progra.id);
              }).catch((error) => {
                console.error("dbCourseOnUpdate on rolesBatch failed for role : ", progra.id, error);
              });
            });
            resolve('program updated');
          }).catch(error => {
          console.error('Error performing roles collection query on dbCourseOnUpdate : ', error);
          reject('program update failed');
        });
      });

      return Promise.all([courseSubscriptionsPromise, rolesPromise, usersPromise,programsPromise]);
    }else {
      return Promise.resolve();
    }
  });
