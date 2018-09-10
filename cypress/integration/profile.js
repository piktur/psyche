const f = require('../fixtures')

describe('Profile', function() {
  const firstName = f.name.firstName()
  const lastName = f.name.lastName()
  const email = 'customer@example.com'
  const password = 'password'

  it('visits root; clicks Sign In; acquires token; sees Profile form', () => {
    cy.visit('/')
    cy.get('button[aria-label="Sign In"]').click()
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('button[type=submit]').click()
    // cy.wait(200)
    // cy.get('.MuiListItem', 'Customer').click()

    cy.location('pathname').should('eq', '/profile')
  })

  it('fills required fields', () => {
    cy.get('input[name=first-name]').type(firstName)
    cy.get('input[name=last-name]').type(lastName)
  })

  it('fills non-required fields', () => {
    cy.get('input[name=birthday]')
    cy.get('input[name=role]').value()
  })

  it('submits form', () => {
    cy.get('button[type=submit').click()
  })
})
