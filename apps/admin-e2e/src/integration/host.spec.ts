import {
  organizationNameInput,
  organizationDescriptionInput,
  organizationTypeInput,
  organizationMediumInput,
  organizationPhoneNumberInput,
  organizationRegNumberInput,
  organizationWebsiteInput,
  organizationEmailInput,
  addressStreetNameInput,
  addressCityNameInput,
  personInChargeNameInput,
  personInChargeDesignationInput,
  personInChargePhoneInput,
  personInChargeEmailInput,
  addHostLocationButton
} from "../support/app.elements";
import { createTestRecord } from "../support/objectUtils";


describe('Organization management page', () => {
  before(() => cy.login());

  it('user should be able to navigate to organization management page', () => {
    cy.location('pathname', {timeout: 60000}).should('include', '/dashboard');
    cy.get("#leftMainNav").then(currentSubject => {
      cy.wrap([
        {id: 'organization_management', url: 'host/info'}
      ]).each((value, i, array) => {
        cy.get('#' + value.id).click().then(() => {
          cy.url().should('include', value.url)
        })
      })
    });
  })

  // To create a new organization
  createTestRecord('info', 'host', 'Malabe Boys School', 'Add', {
    'Organization Details' : {type : 'click'},
    [organizationNameInput] : {text : 'Malabe Boys School', type : 'text'},
    [organizationDescriptionInput] : {text : 'Malabe Boys School', type : 'text'},
    [organizationTypeInput] : {text : 'Daham Pasala', type : 'dropdown'},
    [organizationMediumInput] : {text : 'English (English)', type : 'dropdown'},
    [organizationPhoneNumberInput] : {text : '0112729729', type : 'text'},
    [organizationRegNumberInput] : {text : '00112B', type : 'text'},
    [organizationWebsiteInput] : {text : 'www.mbs.lk', type : 'text'},
    [organizationEmailInput] : {text : 'info@mbs.lk', type : 'text'},
    'Location' : {type : 'click'},
    [addressStreetNameInput] : {text : '12B', type : 'text'},
    [addressCityNameInput] : {text : 'Colombo', type : 'autoComplete'},
    'Person In Charge / Coordinators' : {type : 'click'},
    [personInChargeNameInput] : {text : 'Sameera Roshan', type : 'text'},
    [personInChargeDesignationInput] : {text : 'Volunteer', type : 'text'},
    [personInChargePhoneInput] : {text : '0777297297', type : 'text'},
    [personInChargeEmailInput] : {text : 'sameera@satipasala.com', type : 'text'},
    [addHostLocationButton] : {type : 'button'},
    'Grade 1' : {type : 'click'},
    'Ok' : {type : 'click'},
  }, true, 'leftsidebar:new');
})


