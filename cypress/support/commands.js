Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Aline', { delay: 50 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@', { delay: 10 })
    cy.get('#open-text-area').type('Preciso de ajuda com automação de testes', { delay: 0 })
    cy.get('button[type="submit"]').click()
})