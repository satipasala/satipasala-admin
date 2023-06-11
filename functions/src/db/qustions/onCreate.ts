import * as functions from 'firebase-functions';

export const dbQuestionsOnCreate = functions.firestore
  .document('questions/{questionID}').onCreate((snap, context) => {
    return snap.ref.set({
      id:snap.ref.id,
      disabled: false
    }, {merge: true});
  });
