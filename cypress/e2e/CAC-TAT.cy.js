/// <reference types="cypress" />
describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName")
      .should("be.visible")
      .type("Brendo")
      .should("have.value", "Brendo");

    cy.get("#lastName")
      .should("be.visible")
      .type("Lopes")
      .should("have.value", "Lopes");

    cy.get("#email")
      .should("be.visible")
      .type("brendoslopes@gmail.com")
      .should("have.value", "brendoslopes@gmail.com");

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Estou em dúvida no que escrever neste campo", { delay: 0 })
      .should("have.value", "Estou em dúvida no que escrever neste campo");

    cy.get('button[type="submit"]').click();

    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName")
      .should("be.visible")
      .type("Brendo")
      .should("have.value", "Brendo");

    cy.get("#lastName")
      .should("be.visible")
      .type("Lopes")
      .should("have.value", "Lopes");

    cy.get("#email")
      .should("be.visible")
      .type("errandoEmail")
      .should("have.value", "errandoEmail");

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Estou em dúvida no que escrever neste campo", { delay: 0 })
      .should("have.value", "Estou em dúvida no que escrever neste campo");

    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("não permite valores não-numéricos no campo de telefone", () => {
    cy.get("#phone").should("be.visible").type("e+").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName")
      .should("be.visible")
      .type("Brendo")
      .should("have.value", "Brendo");

    cy.get("#lastName")
      .should("be.visible")
      .type("Lopes")
      .should("have.value", "Lopes");

    cy.get("#email")
      .should("be.visible")
      .type("brendoslopes@gmail.com")
      .should("have.value", "brendoslopes@gmail.com");

    cy.get("#open-text-area")
      .should("be.visible")
      .type("Estou em dúvida no que escrever neste campo", { delay: 0 })
      .should("have.value", "Estou em dúvida no que escrever neste campo");

    cy.get("#phone-checkbox").click();

    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Brendo")
      .should("have.value", "Brendo")
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type("Lopes")
      .should("have.value", "Lopes")
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type("brendoslopes@gmail.com")
      .should("have.value", "brendoslopes@gmail.com")
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type("27996087238")
      .should("have.value", "27996087238")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get(".button").click();

    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Brendo",
      lastName: "Lopes",
      email: "brendoslopes@gmail.com",
      text: "Teste",
    };
    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");
  });

  it("identificando elementos com a funcionalidade cy.contains()", () => {
    cy.contains("button", "Enviar").click();
    cy.contains("strong", "Valide os campos obrigatórios!").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select(["mentoria"]).should("have.value", "mentoria");
    // É possível também passar um array dentro do select para caso seja um select de multipla seleção.
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it.only('marca o tipo de atendimento "Feedback"', () =>{
    cy.get('[type="radio"][value="elogio"]').check().should('have.value', "elogio")
    // cy.get('[name="atendimento-tat"]').check("feedback").should('have.value', "feedback")
    // Segund cenário para selecionar button radio
  })
});
