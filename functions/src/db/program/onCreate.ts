'use strict';
import * as functions from 'firebase-functions';
export const dbProgramOnCreate = functions.firestore.document('programs/{programDoc}').onCreate(event => {
  return event.ref.set({status: "notstarted",feedbacks:{}}, {merge: true});
});
