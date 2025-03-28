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
    cy.contains('button', 'Enviar').click()


    cy.get('.success').should('be.visible');

  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Eu preciso de ajuda, por favor', 10)

    cy.get('#firstName').type('Aline', { delay: 50 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@', { delay: 10 })
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()


    cy.get('.error').should('be.visible');

  })

  it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {

    cy.get('#phone')
      .type('Aline Edvania')
      .should('have.value', '')

  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Aline', { delay: 50 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@', { delay: 10 })
    cy.get('#open-text-area').type('Preciso de ajuda com a automação', { delay: 0 })
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()


    cy.get('.error').should('be.visible');

  })


  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Aline')
      .should('have.value', 'Aline')
      .clear()
      .should('have.value', '')


    cy.get('#lastName')
      .type('Edvania')
      .should('have.value', 'Edvania')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('aline.franca@')
      .should('have.value', 'aline.franca@')
      .clear()
      .should('have.value', '')

    cy.get('#open-text-area')
      .type('Preciso de ajuda com a automação')
      .should('have.value', 'Preciso de ajuda com a automação')
      .clear()
      .should('have.value', '')

  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('.button').click()

    cy.get('.error').should('be.visible');

  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    //Usando valores customizados
    const data = {
      firstName: 'Leandro',
      lastName: 'Franca',
      email: 'leandro@gmail.com',
      text: 'Teste'
    }

    //Comando customizado
    cy.fillMandatoryFieldsAndSubmit(data)

    //camecy.get('.sucess').should('be.visible')
  })

  it('Usando valor padrão do comando customizado', () => {

    //Comando customizado
    cy.fillMandatoryFieldsAndSubmit()

    //cy.get('.sucess').should('be.visible')
  })


  it('Seleciona um produto (Youtube) por seu texto', () => {

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('Seleciona um produto (Mentoria) por seu valor(value)', () => {

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })


  it('Seleciona um produto (Blog) por seu índice', () => {

    cy.get('#product').select(1)
      .should('have.value', 'blog')

  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    //Seletor que não é recomendado utilizar 
    //cy.get(':nth-child(4) > input')
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it.only('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
      })
  })
})