import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";

export const dbActivityOnWrite = functions.firestore.document('activities/{activityId}').onWrite((change, context) => {
  return new Promise((resolve, reject) => {
    const { activityId } = context.params;
    const oldActivity = change.before.data()
    const newActivity = change.after.data();
    const db = admin.firestore();
    let action: 'update' | 'delete';

    if ((oldActivity && newActivity) && (oldActivity?.active === 'Yes' && newActivity?.active === 'Yes')) {
      action = 'update';
    } else if ((oldActivity && !newActivity) || (oldActivity?.active === 'Yes' && newActivity?.active === 'No')) {
      action = 'delete'
    }

    db.collection("courses").where(`activities.${activityId}.id`, '==', activityId).get()
      .then((snap) => {
        const courseBatch = db.batch();
        snap.forEach((doc) => {
          const dbCourse = doc.data(); 

          if (action === 'update') {
            console.info('dbActivityOnWrite [Success] Courses updated successfully')
            dbCourse.activities[activityId] = newActivity; // Update activity from course doc
            courseBatch.update(doc.ref, { activities: dbCourse.activities });
          } else if (action === 'delete') {
            delete dbCourse.activities[activityId]; // Remove activity of course doc
            courseBatch.update(doc.ref, { activities: dbCourse.activities });
          }
        });
        courseBatch.commit().then(() => {
          console.info('dbActivityOnWrite [Success] Courses updated successfully');
          resolve(true);
        }).catch((error) => {
          console.error('dbActivityOnWrite [Error] Failed to write on to courses. Error => ', error);
          reject()
        });
      }).catch(error => {
        console.error('dbActivityOnWrite [Error] Failed to reterieve courses. Error => ', error);
        reject();
      });
  });

});
