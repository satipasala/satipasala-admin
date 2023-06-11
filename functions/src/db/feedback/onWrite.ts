import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const dbFeedbackOnWrite = functions.firestore
  .document('feedback/{feddbackId}').onWrite((change, context) => {
    return new Promise<void>((resolve, reject) => {
      const feedback: any = change.after.data();
      if (feedback) {
        const db = admin.firestore();
        const newFeedback = {
          feedbackId: feedback.id,
          name: feedback.feedback.name,
          id: feedback.feedback.id,
          questions: feedback.feedback.questions
        }
        const subscriptionFeeback = {}
        const feedbackOccurance = feedback.occurrence.number
        subscriptionFeeback[`courseSubscriptions.${feedback.subscriptionId}.feedbacks.${feedbackOccurance}`] = newFeedback;
        subscriptionFeeback[`courseSubscriptions.${feedback.subscriptionId}.status`] = 'started';
        console.log("dbFeedbackOnWrite [Process] Adding new feedback => " + newFeedback.id)
        db.collection("users").doc(feedback.userInfo.id).update(subscriptionFeeback).then(() => {
          console.log('dbFeedbackOnWrite [Success] Feedback on course %s to => %s', feedback.subscriptionId, feedback.userInfo.id);
          resolve()
        }).catch(error => {
          console.log("dbFeedbackOnWrite [Error] Failed to add feedback %s to => %s", newFeedback.id, feedback.userInfo.id);
          reject()
        });
      }
      console.log('dbFeedbackOnWrite [Missing] No feedback to be added')
      resolve();
    })
  });
