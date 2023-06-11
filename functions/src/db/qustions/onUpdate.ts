import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
// @ts-ignore

export const dbQuestionsOnUpdate = functions.firestore
  .document('questions/{questionID}').onUpdate((change, context) => {
    return new Promise<boolean>((resolve, reject) => {
      if (change.after.data().id === change.before.data().id) {
        const question = change.after.data();
        const db = admin.firestore();

        db.collection("questionnaires")
          .where("questionsIdArray", 'array-contains', change.after.id).get()
          .then(snap => {
            const questionnaireBatch = db.batch();

            snap.forEach((doc) => {
              const questionnaire = doc.data();
              console.log("updating not started questionnaire", doc.id);
              questionnaireBatch.update(doc.ref, { questions: getUpdatedQuestionsArray(questionnaire, question) });
            });

            questionnaireBatch.commit().then((result) => {
              console.log("dbCourseOnUpdate questionnaires Success:", result);
              resolve(true);
            }).catch((error) => {
              console.error("Error updaing questionnaires:", error);
              reject();
            });

          }).catch(error => {
            console.error('error', error);
            reject();
          });

      } else {
        resolve(false);
      }
    })
  });


export function getUpdatedQuestionsArray(questionnaire, question) {
  if (questionnaire.questions[question.id] != null) {
    questionnaire.questions[question.id] = question;
  }

  return questionnaire.questions;
}
