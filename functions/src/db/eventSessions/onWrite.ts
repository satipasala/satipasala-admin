import * as functions from 'firebase-functions';
import {updateEventSubscriptions} from "../../utils/actionFeedUtils";
import * as admin from "firebase-admin";

export const dbEventSessionsOnWrite = functions.firestore.document('eventSessions/{sessionId}')
  .onWrite((change, context) => {
  return new Promise((resolve, reject) => {
    const db = admin.firestore();
    updateEventSubscriptions(db,change.before.data(),change.after.data(),true).then(resolve).catch(reject);
  })
});


