// tslint:disable-next-line:no-implicit-dependencies
// @ts-ignore


export function getQuestionIdArray(questionnaire) {
  const questionsIdArray = [];
  if (questionnaire.questions) {
    Object.keys(questionnaire.questions).forEach(value => {
      questionsIdArray.push(value);
    })
  }

  return questionsIdArray;
}
