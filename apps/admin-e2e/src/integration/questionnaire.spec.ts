import {
  newQuestionNameInput,
  newQuestionTypeInput,
  newQuestionDescriptionInput,
  questionnaireNameInput
} from "../support/app.elements";
import { createTestRecord } from "../support/objectUtils";


describe('Auth management page', () => {
  before(() => cy.login());

  it('user should be able to navigate to questionnaire management page', () => {
    cy.location('pathname', {timeout: 60000}).should('include', '/dashboard');
    cy.get("#leftMainNav").then(currentSubject => {
      cy.wrap([
        {id: 'questionnaire_management', url: 'questionnaires/list'}
      ]).each((value, i, array) => {
        cy.get('#' + value.id).click().then(() => {
          cy.url().should('include', value.url)
        })
      })
    });
  })

  // To create a new question
  createTestRecord('questions', 'questionnaires', 'It is easy for me to concentrate on what I am doing', 'Submit', {
    [newQuestionNameInput] : {text : 'It is easy for me to concentrate on what I am doing', type : 'text'},
    [newQuestionTypeInput] : {text : 'Almost Never', type : 'dropdown'},
    [newQuestionDescriptionInput] : {text : 'It is easy for me to concentrate on what I am doing', type : 'text'},
    '#Beginner' : {text : 'Beginner', type : 'radio'},
    '#MindfulGame' : {text : 'Mindful Game', type : 'checkbox'},
    '#SCALE ' : {text : 'SCALE ', type : 'radio'},
  }, true, 'leftsidebar:questions/add');

  // To create a new questionnaire
  createTestRecord('list', 'questionnaires', 'Mindfulness', 'Submit', {
    [questionnaireNameInput] : {text : 'Mindfulness', type : 'text'},
    '#SCALE ' : {text : 'SCALE ', type : 'slide'},
  }, true, 'leftsidebar:add');
})
