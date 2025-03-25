describe('Central de atendimento ao cliente TAT', () => {

  beforeEach(() => {
    cy.visit('src/index.html')
  })


  it('Verifica o título da aplicação', () => {

    //Verificando se título do site é igual
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    //Verificando que o título não é igual
    cy.title().should('not.be.equal', 'Central de Atendimento')
  })


  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Eu preciso de ajuda, por favor', 10)

    cy.get('#firstName').type('Aline', { delay: 100 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@gmail.com', { delay: 130 })
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()


    cy.get('.success').should('be.visible');

  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Eu preciso de ajuda, por favor', 10)

    cy.get('#firstName').type('Aline', { delay: 50 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@', { delay: 10 })
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.get('button[type="submit"]').click()


    cy.get('.error').should('be.visible');

  })

  it.only('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {

    cy.get('#phone')
      .type('Aline Edvania')
      .should('have.value', '')

  })
})