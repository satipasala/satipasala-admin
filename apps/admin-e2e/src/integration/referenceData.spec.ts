import {
  organizationTypeNameInput,
  organizationTypeDescriptionInput,
  activityTypeNameInput,
  activityTypeDescriptionInput,
  questionTypeNameInput,
  questionTypeInput,
  questionTypeLabelInput,
  questionTypeAnswerTypeInput,
  questionLabelNameInput,
  questionLabelTypeInput,
  questionLabelCategoryInput,
  languageNameInput,
  languageTypeInput,
  languageShortNameInput,
  stateNameInput,
  stateShortNameInput,
  stateCountryInput,
  stateDescriptionInput,
  cityNameInput,
  cityCountryInput,
  cityStateInput,
  cityLatitudeInput,
  cityLongitudeInput,
  eventCategoryNameInput,
  eventCategoryDescriptionInput,
  contextMenuEditButton,
  organizationLocationNameInput,
  organizationLocationDisplayNameInput,
  addOrganizationLocationButton
  } from "../support/app.elements";
  import { createTestRecord } from "../support/objectUtils";

describe('Reference Data page', () => {
  before(() => cy.login());

  it('user should be able to navigate to reference data page', ()=> {
    cy.location('pathname', {timeout: 60000}).should('include', '/dashboard');
    cy.get("#leftMainNav").then(currentSubject => {
      cy.wrap([
        {id: 'reference_data', url: 'referencedata/activitytype'}
      ]).each((value, i, array) => {
        cy.get('#' + value.id).click().then(() => {
          cy.url().should('include', value.url)
        })
      })
    });
  });

  const navLink = 'referencedata';
  const btnName = 'Save';

  // To create a new activity type
  createTestRecord('activity type', navLink, 'Game', btnName, {
    [activityTypeNameInput] : {text : 'Game', type : 'text'},
    [activityTypeDescriptionInput] : {text : 'Outdoor gaming activities', type : 'text'}
  });

  // To create a new question type
  createTestRecord('question type', navLink, 'Almost Never', btnName, {
    [questionTypeNameInput] : {text : 'Almost Never', type : 'text'},
    [questionTypeInput] : {text : 'radio', type : 'dropdown'},
    [questionTypeLabelInput] : {text : 'Almost Never', type : 'text'},
    [questionTypeAnswerTypeInput] : {text : 'ALMOST_NEVER', type : 'dropdown'}
  });

  // To create a new question label
  createTestRecord('question label', navLink, 'Mindful Game', btnName, {
    [questionLabelNameInput] : {text : 'Mindful Game', type : 'text'},
    [questionLabelTypeInput] : {text : 'Game', type : 'text'},
    [questionLabelCategoryInput] : {text : 'Beginner', type : 'text'}
  });

  // To create a new organization type
  createTestRecord('organization type', navLink, 'Daham Pasala', btnName, {
    [organizationTypeNameInput] : {text : 'Daham Pasala', type : 'text'},
    [organizationTypeDescriptionInput] : {text : 'Daham Pasala Organization', type : 'text'}
  });

  // To create new location assigned to the organization type
  it('user should be able to add locations to organization type', () => {
    cy.get('#DahamPasala').find(contextMenuEditButton).click().then(() => {
      cy.get(organizationLocationNameInput).type('Grade 01').should('have.value', 'Grade 01');
      cy.get(organizationLocationDisplayNameInput).type('Grade 01').should('have.value', 'Grade 01');
      cy.get(addOrganizationLocationButton).click();
      cy.contains('Save').click();
    })
  });

  // To create a new language
  createTestRecord('language', navLink, 'English', btnName, {
    [languageNameInput] : {text : 'English', type : 'text'},
    [languageTypeInput] : {text : 'English', type : 'text'},
    [languageShortNameInput] : {text : 'en', type : 'text'}
  });

  // To create a new state/province
  createTestRecord('states', navLink, 'Colombo', btnName, {
    [stateNameInput] : {text : 'Colombo', type : 'text'},
    [stateShortNameInput] : {text : 'Colombo District', type : 'text'},
    [stateCountryInput] : {text : 'Sri Lanka', type : 'autoComplete'},
    [stateDescriptionInput] : {text : 'Colombo District', type : 'text'}
  });

  // To create a new city
  createTestRecord('cities', navLink, 'Colombo', btnName, {
    [cityNameInput] : {text : 'Colombo', type : 'text'},
    [cityCountryInput] : {text : 'Sri Lanka', type : 'autoComplete'},
    [cityStateInput] : {text : 'Colombo', type : 'autoComplete'},
    [cityLatitudeInput] : {text : '6.9272', type : 'text'},
    [cityLongitudeInput] : {text : '79.8611', type : 'text'}
  });

  // To create a new event category
  createTestRecord('event Category', navLink, 'Fund Raiser', btnName, {
    [eventCategoryNameInput] : {text : 'Fund Raiser', type : 'text'},
    [eventCategoryDescriptionInput] : {text : 'Fund Raiser', type : 'text'}
  });
})
