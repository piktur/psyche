const f = require('../fixtures')

describe('Sign Up as Customer', function() {
  const email = f.email()
  const password = 'password'

  it('visits root; clicks Sign Up', function() {
    cy.visit('/')
    cy.get('button[aria-label="Sign In"]').click()
    cy.get('button[name=sign-up]')
  })

  it('selects role; enters credentials; is redirected to /profile', () => {
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('div[class*=MuiSelect-selectMenu]').click()
    cy.get('[data-value=customer]').click()
    cy.get('button[name=sign-up]').click()

    cy.location('pathname').should('eq', '/profile')
  })
})
