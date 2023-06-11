import * as functions from 'firebase-functions';
import { getQuestionIdArray } from "./common";
// @ts-ignore
import * as admin from "firebase-admin";

export const dbQuestionnaireOnUpdate = functions.firestore.document('questionnaires/{questionnaireDoc}').onUpdate((change, context) => {
  return new Promise((resolve, reject) => {
    if (change.after.id === change.before.id) {
      const db = admin.firestore();
      const questionnaire = change.after.data();
      change.after.ref.set({ questionsIdArray: getQuestionIdArray(questionnaire) }, { merge: true }).then(() => {
        console.info("Updating questionnaire success");

        db.collection("courses")
          .where("questionnaire.id", '==', change.after.id).get()
          .then(snap => {

            const courseBatch = db.batch();

            snap.forEach((doc) => {
              console.log("updating course in course collection", doc.id);
              courseBatch.update(doc.ref, { questionnaire: questionnaire })
            });

            courseBatch.commit().then((result) => {
              console.log("dbQuestionnaireOnUpdate course update Success:", result);
              resolve(true);
            }).catch((error) => {
              console.error("dbQuestionnaireOnUpdate Error updaing courses:", error);
              reject()
            });
          }).catch(error => {
            console.error('error', error);
            reject()
          });


      }).catch((error) => {
        console.error("Error updating questionnaire:", error);
        reject()
      });
    }else{
      resolve(true)
    }
  })
});
