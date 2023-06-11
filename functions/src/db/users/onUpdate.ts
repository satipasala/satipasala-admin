import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  addCourseSubscription,
  addProgramSubscription,
  addSessionSubscription,
  addUpdatedFeedback,
  addUserCourseSubscriptions,
  getAddedSessionSubscriptions,
  getAllCoursesAddedToRole,
  getCustomClaims,
  getNewCoursesAddedToUser,
  getNewProgramsAddedToUser,
  getRemovedCoursesFromRole,
  getRemovedCoursesFromUser,
  getRemovedProgramsFromUser,
  getUpdatedFeedbackFromUser,
  removeCourseSubscription,
  removeProgramSubscription,
  removeUserCourseSubscription
} from "../../utils/objectUtils";

// This function will update the customClaims in the user token, if the users Role changes.
export const dbUsersOnUpdate = functions.firestore.document('users/{userId}').onUpdate((snap, context) => {
  return new Promise<any>((resolve, reject) => {
    const {userId} = context.params;
    const db = admin.firestore();
    // Exit when the data is deleted.
    if (!snap.after.exists) {
      console.log('dbUsersOnUpdate [Error] Invalid request. Request to delete %s document denied', userId);
      reject();
    } else {
      const oldUser = snap.before.data();
      const updatedUser = snap.after.data();
      console.log('dbUsersOnUpdate [Process] Accessing user data of => %s', updatedUser.email);
      const batch = db.batch();
      // Removing course subscriptions which have not been started and not assigned to the new role
      if (updatedUser.userRole.id !== oldUser.userRole.id) {
        console.log('user [role changed]', updatedUser.email);
      }
      let needUpdate = false;


      getRemovedCoursesFromUser(oldUser, updatedUser).forEach(course => {
        console.log("user [course removed].............. removing user %s course %s.", updatedUser.email, course.id);
        removeCourseSubscription(db, batch, updatedUser, course);
      });

      getNewCoursesAddedToUser(oldUser, updatedUser).forEach(course => {
        console.log("user [course added].............. adding user %s course %s.", updatedUser.email, course.id);

        addCourseSubscription(db, batch, updatedUser, course);
      });

      getRemovedProgramsFromUser(oldUser, updatedUser).forEach(program => {
        console.log("user [program removed].............. removing user %s program %s.", updatedUser.email, program.id);
        removeProgramSubscription(db, batch, updatedUser, program);
      });

      getNewProgramsAddedToUser(oldUser, updatedUser).forEach(program => {
        console.log("user [program added].............. adding user %s program %s.", updatedUser.email, program.id);
        addProgramSubscription(db, batch, updatedUser, program);
      });

      getAddedSessionSubscriptions(oldUser, updatedUser).forEach(session => {
        console.log("user [session added].............. adding user %s session %s.", updatedUser.email, session.id);
        addSessionSubscription(db, batch, updatedUser, session);
      });
      getUpdatedFeedbackFromUser(oldUser, updatedUser).forEach(feedback => {
        // assignUpdatedFeedback(db, batch, updatedUser, feedback)
        //   updateCourseSubscriptionOnFeedbackUpdate(db, batch, updatedUser, feedback)
        console.log("user [feedback added].............. adding user %s feedback %s.", updatedUser.email, feedback.id);
        addUpdatedFeedback(db, batch, updatedUser, feedback);
      });


      getRemovedCoursesFromRole(oldUser.userRole, updatedUser.userRole).forEach(course => {
        if (updatedUser.courseSubscriptions[course.id] && 'started' !== updatedUser.courseSubscriptions[course.id].status) {
          console.log("user [role updated] with new role.............. removing user %s course %s.", updatedUser.email, course.id);
          needUpdate = true;
          removeUserCourseSubscription(updatedUser, course.id);
        }
      });

      getAllCoursesAddedToRole(updatedUser.userRole).forEach(course => {
        console.log("user [role updated] with new role.............. adding user %s course %s.", updatedUser.email, course.id);
        needUpdate = true;
        addUserCourseSubscriptions(updatedUser, course)
      });
      if (needUpdate) {
        batch.update(db.collection('users').doc(updatedUser.id), {courseSubscriptions: updatedUser.courseSubscriptions});
      }

      batch.commit().then(() => {
        console.log(' [Success] Course subscriptions of %s updated successfully', updatedUser.email);
        admin.auth().setCustomUserClaims(updatedUser.uid, getCustomClaims(updatedUser)).then(() => {
          console.log('custom claims updated on %s', updatedUser.id)
          resolve("[Success] Course subscriptions of %s updated successfully'" + updatedUser.email)
        }).catch(error => {
          console.error('Error setting auth claims:', error);
          reject('Error setting auth claims:' + error);
        });
      }).catch((error) => {
        console.error(" [Error] Course subscriptions of %s failed to update. Error => %s", updatedUser.email, error);
        reject()
      });
    }
  })
});



