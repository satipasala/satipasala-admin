// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
import { loginButton, loginEmailInput, loginPasswordInput, logoutMenuButton, logoutButton } from "./app.elements";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      login(): Chainable<Window>;
      logout(): Chainable<any>;
    }
  }
}

/**
 * Goes to google site
 */
Cypress.Commands.add('login', () => {
  cy.visit('/login').then(window => {
    if (window.location.pathname.includes('/login')) {
      cy.get(loginEmailInput).type('sameeraroshanuom@gmail.com')
      cy.get(loginPasswordInput).type('123456')
      cy.get(loginButton).click();
    }
  })
})

Cypress.Commands.add('logout', () => {
  cy.get(logoutMenuButton).click()
  cy.get(logoutButton).click();
})

Cypress.on('uncaught:exception', (err, runnable) => {
  return true;
});

// Convert this to a module instead of script (allows import/export)
export { }


