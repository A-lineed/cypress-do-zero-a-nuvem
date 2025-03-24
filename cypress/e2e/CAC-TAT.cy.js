describe('Central de atendimento ao cliente TAT', () => {
  it('Verifica o título da aplicação', () => {
    cy.visit('src/index.html')
    //Verificando se título do site é igual
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

    //Verificando que o título não é igual
    cy.title().should('not.be.equal', 'Central de Atendimento')
  })
})