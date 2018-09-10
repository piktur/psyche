const f = require('../fixtures')

describe('Sign Up as Customer', function() {
  const email = f.email()
  const password = 'password'

  it('visits root; clicks Sign Up', function() {
    cy.visit('/')
    cy.get('button', 'Sign Up').click()
    cy.contains('form', 'Sign Up')
  })

  it('selects User role; enters credentials', () => {
    cy.get('button[value=customer]').click()
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('button[type=submit]').click()
  })

  it('redirects to Profile', () => {
    cy.location('pathname').should('eq', '/profile')
  })
})
