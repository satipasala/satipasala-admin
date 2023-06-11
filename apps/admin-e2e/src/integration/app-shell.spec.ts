// import { getGreeting } from '../support/app.po';


describe('App Shell page', () => {
  before(() => cy.login());


  it('user should be able to navigate through menu', () => {
    cy.location('pathname', {timeout: 60000}).should('include', '/dashboard');
    cy.get("#leftMainNav").then(currentSubject => {
      cy.wrap([{id: "dashboard", url: 'dashboard'},
        {id: 'user_management', url: 'users/management'},
        {id: 'organization_management', url: 'host/info'},
        {id: 'questionnaire_management', url: 'questionnaires/list'},
        {id: 'course_management', url: 'cources/courceInfo'},
        {id: 'event_management', url: 'events/events'},
        {id: 'auth_management', url: 'auth/roles'},
        {id: 'reference_data', url: 'referencedata/activitytype'}

      ]).each((value, i, array) => {
        cy.get('#' + value.id).click().then(() => {
          cy.url().should('include', value.url)
        })
      })
    });
  })

  it('user should be able to logout', () => {
    cy.logout();
    cy.reload().then(() => {
      cy.url().should('include', '/login')
    })
  })

});
