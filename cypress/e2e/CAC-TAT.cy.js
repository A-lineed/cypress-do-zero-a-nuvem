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
    cy.get('#firstName').type('Aline')
    cy.get('#lastName').type('Edvania')
    cy.get('#email').type('aline.franca@gmail.com')
    cy.get('#open-text-area').type('Preciso de ajuda com os testes')
    cy.get('button[type="submit"]').click()
    

    cy.get('.success').should('be.visible');

  })
})