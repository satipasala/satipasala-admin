import * as functions from 'firebase-functions';

export const dbHostsOnCreate = functions.firestore
  .document('hosts/{hostId}').onCreate((snap, context) => {
    return snap.ref.set({
      id:snap.ref.id,
      students:{}
    }, {merge: true});
  });
