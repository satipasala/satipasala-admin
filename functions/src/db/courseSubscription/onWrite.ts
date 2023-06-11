/*
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const dbCourseSubscriptionOnWrite = functions.firestore
  .document('courseSubscriptions/{courseSubscriptionId}').onWrite((event, context) => {
    return new Promise<any>((resolve, reject) => {
      const {courseSubscriptionId} = context.params;
      const courseSubscription = event.after.data();
      const db = admin.firestore();
      if (courseSubscription && courseSubscription.userInfo && courseSubscription.userInfo.id) {
        db.collection("users").where('id', '==', courseSubscription.userInfo.id).get()
          .then(snap => {
            snap.forEach((doc) => {
              const user = doc.data();
              if (user.courseSubscriptions == null) {
                user.courseSubscriptions = {};
              }

              if (courseSubscription.course) {
                if(user.courseSubscriptions[courseSubscription.course.id] != null &&
                  'started' !== user.courseSubscriptions[courseSubscription.course.id].status){
                  console.log("dbCourseSubscriptionOnWrite course %s already started.not updating",courseSubscription.course.id);
                  reject()
                }else{
                  user.courseSubscriptions[courseSubscription.course.id] = courseSubscription.course;
                  const subscriptionId = courseSubscription.course.id;
                  console.log("dbCourseSubscriptionOnWrite [Process] Assigning %s course to %s", courseSubscription.course.id, doc.id);
                  db.collection('users').doc(courseSubscription.userInfo.id).update({courseSubscriptions: user.courseSubscriptions}).then(() => {
                    console.log("dbCourseSubscriptionOnWrite [Success] Course %s assigned successfully", subscriptionId);
                    resolve()
                  }).catch(error => {
                    console.log("dbCourseSubscriptionOnWrite [Error] Course assignment failed on %s. Error => ", subscriptionId, error);
                    reject()
                  })
                }

              } else {
                console.log("dbCourseSubscriptionOnWrite [Missing] Course not available");
                resolve()
              }
            });
          }).catch(error => {
          console.error('dbCourseSubscriptionOnWrite [Error] Performing query on users collection failed. Error => %s', error);
          reject()
        });
      } else {
        console.error('dbCourseSubscriptionOnWrite [Missing] course-subscription details missing on %s', courseSubscriptionId);
        resolve()
      }
    })
  });
*/
