/// <reference types="cypress" />

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
    cy.get("#firstName")
      .should("be.visible")
      .type(data.firstName)
      .should("have.value", "Brendo");

    cy.get("#lastName")
      .should("be.visible")
      .type(data.lastName)
      .should("have.value", "Lopes");

    cy.get("#email")
      .should("be.visible")
      .type(data.email)
      .should("have.value", "brendoslopes@gmail.com");

    cy.get("#open-text-area")
      .should("be.visible")
      .type(data.text, { delay: 0 })
      .should("have.value", "Teste");

    cy.get('button[type="submit"]').click();
})