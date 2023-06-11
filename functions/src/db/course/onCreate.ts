import * as functions from 'firebase-functions';
export const dbCourseOnCreate = functions.firestore.document('courses/{courseDoc}').onCreate(event => {
  return event.ref.set({status: "notstarted",feedbacks:{}}, {merge: true});
});
