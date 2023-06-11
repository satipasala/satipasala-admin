import {
  authRoleNameInput,
  authRoleLevelInput,
  authRoleOrganizationTypeInput,
  authRoleViewPermissionLevelInput,
  authRoleEditPermissionLevelInput
} from "../support/app.elements";
import { createTestRecord } from "../support/objectUtils";


describe('Auth management page', () => {
  before(() => cy.login());

  it('user should be able to navigate to auth management page', () => {
    cy.location('pathname', {timeout: 60000}).should('include', '/dashboard');
    cy.get("#leftMainNav").then(currentSubject => {
      cy.wrap([
        {id: 'auth_management', url: 'auth/roles'}
      ]).each((value, i, array) => {
        cy.get('#' + value.id).click().then(() => {
          cy.url().should('include', value.url)
        })
      })
    });
  })

  // To create a new role
  createTestRecord('roles', 'auth', 'Student', 'Submit', {
    [authRoleNameInput] : {text : 'Student', type : 'text'},
    [authRoleLevelInput] : {text : 'Student', type : 'dropdown'},
    [authRoleOrganizationTypeInput] : {text : 'Daham Pasala', type : 'dropdown', forceClick : true},
    [authRoleViewPermissionLevelInput] : {text : 'Country', type : 'dropdown'},
    [authRoleEditPermissionLevelInput] : {text : 'Disabled', type : 'dropdown'},
    '#ActivitiesCollection' : {text : 'View', type : 'checkbox'},
    '#CoursesCollection' : {text : 'View', type : 'checkbox'}
  }, true, 'leftsidebar:permissions/new');
})
