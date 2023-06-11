import {
  addNewItemButton,
} from "./app.elements";

export function createTestRecord(testType : string, navLink : string, recordToValidate : string, btnName : string, inputFields : object, checkforSideBar? : boolean, subNavLink? : string){
  it('user should be able to create new ' + testType, () => {
    cy.get('#' + testType.replace(/\s/g, "")).click().then(() => {
      cy.location('pathname', {timeout: 20000}).should('include', '/'+ navLink + '/' + testType.replace(/\s/g, ""));
      cy.get(addNewItemButton, {delay : 200}).click();

      if(checkforSideBar){
        cy.location('pathname', {timeout: 20000}).should('include', subNavLink);
        cy.wait(1000); // For the sidebar to load
      }

      for (const [inputId, inputValue] of Object.entries(inputFields)) {
        switch (inputValue.type) {
          case 'dropdown':
            // 'select' is only avaiable for native html elements in cypress
            cy.get(inputId, {delay : 100}).click().get('mat-option').contains(inputValue.text).click();
            if(inputValue.forceClick) {
              cy.get('.cdk-overlay-backdrop').click('top');
            }
            break;
          case 'checkbox':
            cy.get(inputId).contains(inputValue.text).click();
            break;
          case 'autoComplete':
            cy.get(inputId).type(inputValue.text);
            cy.get('mat-option', {delay : 300}).contains(inputValue.text).click();
            break;
          case 'radio':
            cy.get(inputId).contains(inputValue.text).click();
            break;
          case 'slide':
            cy.get('.mat-slide-toggle-label').first().click(); // To select the first slide toggle
            break;
          case 'text':
            cy.get(inputId).type(inputValue.text).should('have.value', inputValue.text);
            break;
          case 'click':
            cy.contains(inputId).click();
            break;
          case 'button':
            cy.get(inputId).click();
            break;
        }
      }
      cy.contains(btnName).click();
      cy.wait(1000); // For the record to be created on firestore
      cy.contains(recordToValidate)
    });
  });
}
