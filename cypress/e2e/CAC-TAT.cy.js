/// <reference types="cypress" />
describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() =>{
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () =>{
    cy.get('#firstName')
    .should('be.visible')
    .type('Brendo')
    .should('have.value', 'Brendo')

    cy.get('#lastName')
    .should('be.visible')
    .type('Lopes')
    .should('have.value', 'Lopes')

    cy.get('#email')
    .should('be.visible')
    .type('brendoslopes@gmail.com')
    .should('have.value', 'brendoslopes@gmail.com')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Estou em dúvida no que escrever neste campo', { delay: 0})
    .should('have.value', 'Estou em dúvida no que escrever neste campo')
    
    cy.get('button[type="submit"]').click()

    cy.get('.success')
    .should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () =>{
    cy.get('#firstName')
    .should('be.visible')
    .type('Brendo')
    .should('have.value', 'Brendo')

    cy.get('#lastName')
    .should('be.visible')
    .type('Lopes')
    .should('have.value', 'Lopes')

    cy.get('#email')
    .should('be.visible')
    .type('errandoEmail')
    .should('have.value', 'errandoEmail')

    cy.get('#open-text-area')
    .should('be.visible')
    .type('Estou em dúvida no que escrever neste campo', { delay: 0})
    .should('have.value', 'Estou em dúvida no que escrever neste campo')

    cy.get('button[type="submit"]').click()

    cy.get('.error')
    .should('be.visible')
  })
})
