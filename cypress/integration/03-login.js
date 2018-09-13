const f = require('../fixtures')

describe('Login', function() {
  const email = 'customer@example.com'
  const password = 'password'

  it('visits /login; enters credentials; redirected to /customer', function() {
    cy.visit('/login')
    cy.contains('Login')

    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('button[name=login]').click()

    cy.location('pathname').should('eq', '/customer')
  })
})
