import * as functions from 'firebase-functions';
import {updateEventSubscriptions} from "../../utils/actionFeedUtils";
import * as admin from "firebase-admin";

export const dbEventOnWrite = functions.firestore.document('events/{eventId}').onWrite((change, context) => {
  return new Promise((resolve, reject) => {
    const {eventId} = context.params;
    const db = admin.firestore();
    updateEventSubscriptions(db,change.before.data(), change.after.data(),true).then(resolve).catch(reject);
  })
});

