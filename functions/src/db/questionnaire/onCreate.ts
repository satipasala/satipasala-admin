'use strict';
import * as functions from 'firebase-functions';
import {getQuestionIdArray} from "./common";
// tslint:disable-next-line:no-implicit-dependencies
// @ts-ignore

export const dbQuestionnaireOnCreate = functions.firestore.document('questionnaires/{questionnaireDoc}').onCreate(event => {
  const questionnaire = event.ref;
  return event.ref.set({
    id: event.ref.id,
    questionsIdArray: getQuestionIdArray(questionnaire)
  }, {merge: true}).then(() => {
    console.info("Updating questionnaire success");
  }).catch((error) => {
    console.error("Error updating questionnaire:", error);
  });
});
