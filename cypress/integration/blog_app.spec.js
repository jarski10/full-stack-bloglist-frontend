describe('Blog app', function () {

  const user = {
    name: "jarkko p",
    username: "jarkko",
    password: "password"
  }

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })


  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('jarkko')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('jarkko p logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('wrong')
      cy.get('#password').type('credentials')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })



    it('A blog can be created', function () {

      cy.get('#add-blog-button').click()
      cy.get('#title').type('Blogi')
      cy.get('#author').type('Author')
      cy.get('#url').type('blogURL')
      cy.get('#submit-button').click()

      cy.get('#blog-list').contains('Blogi')
    })
  })
})