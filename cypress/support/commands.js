Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    //Valor padrão que vai ser utilizado se não for passado o data na função
    firstName: 'Edvania',
      lastName: 'Maria',
      email: 'edvania.maria@gmail.com',
      text: 'Ajudando aline'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click()
})