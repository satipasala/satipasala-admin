'use strict';
import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const dbOnCityUpdate = functions.firestore.document('referencedata/cities').onUpdate((change, context) => {
  const citiesBefore = change.before.data();
  const citiesAfter = change.after.data();
  const db = admin.firestore();
  let isUpdated = false;
  let hostPromise: Promise<any>, eventPromise: Promise<any>, userPromise: Promise<any>, feedbackPromise: Promise<any>,
    courseSubscriptionPromise: Promise<any>, programSubscriptionPromise: Promise<any>;

  Object.keys(citiesAfter).forEach((city: any) => {
    isUpdated = JSON.stringify(citiesBefore[city]) !== JSON.stringify(citiesAfter[city]);
    if (isUpdated) {
      // Updating addressInfo on hosts collection
      hostPromise = new Promise((resolve, reject) => {
        db.collection("hosts").where(`addressInfo.city.id`, '==', citiesAfter[city].id).get()
          .then((snap) => {
            const hostBatch = db.batch();
            snap.forEach((doc) => {
              const dbHost = doc.data();
              dbHost.addressInfo.city = citiesAfter[city];
              hostBatch.update(doc.ref, { addressInfo: dbHost.addressInfo });
            });
            hostBatch.commit()
              .then(() => resolve(true))
              .catch((error) => console.error("dbOnCitiesUpdate : Hosts [Error] Failed to update addressInfo. Error => ", error));
          }).catch(error => reject(new Error('dbOnCitiesUpdate : Hosts [Error] Failed to reterieve hosts. Error => ' + error)));
      });

      // Updating addressInfo on events collection
      eventPromise = new Promise((resolve, reject) => {
        db.collection("events").where(`addressInfo.city.id`, '==', citiesAfter[city].id).get()
          .then((snap) => {
            const eventBatch = db.batch();
            snap.forEach((doc) => {
              const dbEvent = doc.data();
              dbEvent.addressInfo.city = citiesAfter[city];
              eventBatch.update(doc.ref, { addressInfo: dbEvent.addressInfo });
            });
            eventBatch.commit()
              .then(() => resolve(true))
              .catch((error) => console.error("dbOnCitiesUpdate : Events [Error] Failed to update addressInfo. Error => ", error));
          }).catch(error => reject(new Error('dbOnCitiesUpdate : Events [Error] Failed to reterieve events. Error => ' + error)));
      });

      // Updating addressInfo on users collection
      userPromise = new Promise((resolve, reject) => {
        db.collection("users").where(`addressInfo.city.id`, '==', citiesAfter[city].id).get()
          .then((snap) => {
            const userBatch = db.batch();
            snap.forEach((doc) => {
              const dbUser = doc.data();
              dbUser.addressInfo.city = citiesAfter[city];
              userBatch.update(doc.ref, { addressInfo: dbUser.addressInfo });
            });
            userBatch.commit()
              .then(() => resolve(true))
              .catch((error) => console.error("dbOnCitiesUpdate : Users [Error] Failed to update addressInfo. Error => ", error));
          }).catch(error => reject(new Error('dbOnCitiesUpdate : Users [Error] Failed to reterieve users. Error => ' + error)));
      });

      // Updating addressInfo on feedback collection
      feedbackPromise = new Promise((resolve, reject) => {
        db.collection("feedback").where(`userInfo.addressInfo.city.id`, '==', citiesAfter[city].id).get()
          .then((snap) => {
            const feedbackBatch = db.batch();
            snap.forEach((doc) => {
              const dbFeedback = doc.data();
              dbFeedback.userInfo.addressInfo.city = citiesAfter[city];
              feedbackBatch.update(doc.ref, { userInfo: dbFeedback.userInfo });
            });
            feedbackBatch.commit()
              .then(() => resolve(true))
              .catch((error) => console.error("dbOnCitiesUpdate : Feedback [Error] Failed to update addressInfo. Error => ", error));
          }).catch(error => reject(new Error('dbOnCitiesUpdate : Feedback [Error] Failed to reterieve feedback. Error => ' + error)));
      });

      // Updating addressInfo on courseSubscription collection
      courseSubscriptionPromise = new Promise((resolve, reject) => {
        db.collection("courseSubscriptions").where(`userInfo.addressInfo.city.id`, '==', citiesAfter[city].id).get()
          .then((snap) => {
            const courseSubscriptionsBatch = db.batch();
            snap.forEach((doc) => {
              const dbCourseSubscription = doc.data();
              dbCourseSubscription.userInfo.addressInfo.city = citiesAfter[city];
              courseSubscriptionsBatch.update(doc.ref, { userInfo: dbCourseSubscription.userInfo });
            });
            courseSubscriptionsBatch.commit()
              .then(() => resolve(true))
              .catch((error) => console.error("dbOnCitiesUpdate : CourseSubscriptions [Error] Failed to update addressInfo. Error => ", error));
          }).catch(error => reject(new Error('dbOnCitiesUpdate : CourseSubscriptions [Error] Failed to reterieve courseSubscriptions. Error => ' + error)));
      })

      // Updating addressInfo on courseSubscription collection
      programSubscriptionPromise = new Promise((resolve, reject) => {
        db.collection("programSubscriptions").where(`userInfo.addressInfo.city.id`, '==', citiesAfter[city].id).get()
          .then((snap) => {
            const courseSubscriptionsBatch = db.batch();
            snap.forEach((doc) => {
              const dbCourseSubscription = doc.data();
              dbCourseSubscription.userInfo.addressInfo.city = citiesAfter[city];
              courseSubscriptionsBatch.update(doc.ref, { userInfo: dbCourseSubscription.userInfo });
            });
            courseSubscriptionsBatch.commit()
              .then(() => resolve(true))
              .catch((error) => console.error("dbOnCitiesUpdate : CourseSubscriptions [Error] Failed to update addressInfo. Error => ", error));
          }).catch(error => reject(new Error('dbOnCitiesUpdate : CourseSubscriptions [Error] Failed to reterieve courseSubscriptions. Error => ' + error)));
      })
    }
  });

  return Promise.all([hostPromise, eventPromise, userPromise, feedbackPromise, courseSubscriptionPromise,programSubscriptionPromise])
    .then(() => console.log('dbOnCitiesUpdate [Success] AddressInfo updated on Hosts, Events, Users, Feedback & CourseSubscriptions collection'))
    .catch(error => console.log(error.message));
});
