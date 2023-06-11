import * as functions from 'firebase-functions';
import {updateEventSubscriptions,} from "../../utils/actionFeedUtils";
import * as admin from "firebase-admin";

/*export const dbEventSessionsOnUpdate = functions.firestore.document('eventSessions/{sessionId}')
  .onUpdate(async (change, context) => {
    return new Promise<any>((resolve, reject) => {
      const db = admin.firestore();
      updateEventSubscriptions(db, change.before.data(), change.after.data(), true).then(resolve).catch(reject);
    });
  });*/




