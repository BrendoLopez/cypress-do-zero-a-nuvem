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
    cy.contains("strong", "Valide os campos obrigatórios!").should(
      "be.visible"
    );
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

  it('marca o tipo de atendimento "Feedback"', () => {
    //cy.get('[type="radio"][value="elogio"]').check().should('have.value', "elogio")
    cy.get('[name="atendimento-tat"]')
      .check("feedback")
      .should("have.value", "feedback");
    // Segundo cenário é o mais usado para selecionar button radio.
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).check().should("be.checked");
      cy.wait(500);
      // Inserido um delay em cada radio marcado para visualizar melhor os testes;
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName")
      .should("exist")
      .and("be.visible")
      .type("Brendo")
      .should("have.value", "Brendo");

    cy.get("#lastName")
      .should("exist")
      .and("be.visible")
      .type("Lopes")
      .should("have.value", "Lopes");

    cy.get("#email")
      .should("exist")
      .and("be.visible")
      .type("brendo@gmail.com")
      .should("have.value", "brendo@gmail.com");

    cy.get("#phone-checkbox").should("exist").and("be.visible").check();

    cy.get(".button").should("exist").and("be.visible").click();

    cy.get(".error").should("exist").and("be.visible");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload").selectFile("cypress/fixtures/example.json");

    // Cenário com dois tipos de verificação de upload de arquivos.
    cy.get("#file-upload").then(($input) => {
      const files = $input[0].files;
      expect(files[0].name).to.equal("example.json");
    });

    cy.get("#file-upload").should((input) => {
      expect(input[0].files[0].name).to.equal("example.json");
    });
  });

  // Teste com drag-and-drop "Arrasta e solta".
  it('seleciona um arquivo simulando um drag-and-drop', () => {
     cy.get("#file-upload").selectFile("cypress/fixtures/example.json", { action: 'drag-drop'});

    // Cenário com dois tipos de verificação de upload de arquivos.
    cy.get("#file-upload").then(($input) => {
      const files = $input[0].files;
      expect(files[0].name).to.equal("example.json");
    });

    cy.get("#file-upload").should((input) => {
      expect(input[0].files[0].name).to.equal("example.json");
    });
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('sampleFile')
    cy.get("#file-upload").selectFile("@sampleFile").should((input) => {
      expect(input[0].files[0].name).to.equal("example.json");
    });
  });
});
