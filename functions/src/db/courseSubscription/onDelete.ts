/*
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {removeUserCourseSubscriptions} from "../../utils/objectUtils";

export const dbCourseSubscriptionOnDelete = functions.firestore
  .document('courseSubscriptions/{courseSubscriptionId}').onDelete((event, context) => {
    return new Promise<any>((resolve, reject) => {
      const {courseSubscriptionId} = context.params;
      const removedSubscription = event.data();
      if (removedSubscription && removedSubscription.userInfo && removedSubscription.userInfo) {
        const db = admin.firestore();
        db.collection("users").where('id', '==', removedSubscription.userInfo.id).get()
          .then(snap => {
            snap.forEach((doc) => {
              const user = doc.data();
              removeUserCourseSubscriptions(db,user,removedSubscription).then(() => {
                console.log("dbCourseSubscriptionOnDelete [Success] Course %s unsubscribed successfully");
                resolve()
              }).catch(error => {
                console.log("dbCourseSubscriptionOnDelete [Error] Course unsubscription failed user %s. Error => %s", user.email, error);
                reject()
              });
            });
          }).catch(error => {
            console.error('dbCourseSubscriptionOnDelete [Error] Performing users collection query failed. Error => %s', error);
            reject()
          });
      } else {
        console.log("dbCourseSubscriptionOnDelete [Missing] Document %s does not exist", courseSubscriptionId);
        resolve()
      }
    });
  });

*/
