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
    cy.clock()

    const longText = Cypress._.repeat('Eu preciso de ajuda, por favor', 10)

    cy.get('#firstName').type('Aline', { delay: 100 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@gmail.com', { delay: 130 })
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()


    cy.get('.success').should('be.visible');

    cy.tick(3000) //avançando 3 segundos no tempo

    cy.get('.success').should('not.be.visible')

  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    const longText = Cypress._.repeat('Eu preciso de ajuda, por favor', 10)

    cy.get('#firstName').type('Aline', { delay: 50 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@', { delay: 10 })
    cy.get('#open-text-area').type(longText, { delay: 0 })
    cy.contains('button', 'Enviar').click()


    cy.get('.error').should('be.visible');

    cy.tick(3000)


    cy.get('.error').should('not.be.visible');
  })

  it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {

    cy.get('#phone')
      .type('Aline Edvania')
      .should('have.value', '')

  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Aline', { delay: 50 })
    cy.get('#lastName').type('Edvania', { delay: 120 })
    cy.get('#email').type('aline.franca@', { delay: 10 })
    cy.get('#open-text-area').type('Preciso de ajuda com a automação', { delay: 0 })
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()


    cy.get('.error').should('be.visible');
    cy.tick(3000)
    cy.get('.error').should('not.be.visible');
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

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    //Pega todos os elementos
    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .last() //Pegar o último elemento 
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        //console.log(input[0].files[0].name) -> Verifica se o nome do arquivo está sendo retornado corretamente
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        //console.log(input[0].files[0].name) -> Verifica se o nome do arquivo está sendo retornado corretamente
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')

      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    //É muito difícil uma página web ter só um link, então utilizar seletor como esse não é uma boa prática, é muito genérico
    //cy.get('a')
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })

})