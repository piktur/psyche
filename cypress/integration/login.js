const f = require('../fixtures')

describe('Login', function() {
  const email = 'customer@example.com'
  const password = 'password'

  it('visits /login', function() {
    cy.visit('/login')
    cy.contains('Login')
  })

  it('enters credentials', () => {
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('button[name=login]').click()
  })

  it('redirects to customer page', () => {
    cy.location('pathname').should('eq', '/customer')
  })
})
