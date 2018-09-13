const f = require('../fixtures')

describe('Profile', function() {
  const firstName = f.name.firstName()
  const lastName = f.name.lastName()
  const email = `${firstName}@example.com`
  const password = 'password'
  const address = {
    address1: f.secondaryAddress(),
    address2: f.streetAddress(),
    state: f.state(),
    city: f.city(),
    country: f.country(),
    postCode: f.zipCode(),
    isBilling: true
  }

  it('visits /signup; acquires token; is presented with Profile form', () => {
    cy.visit('/')
    cy.get('button[aria-label="Sign In"]').click()
    cy.get('input[name=email]').type(email)
    cy.get('input[name=password]').type(password)
    cy.get('div[class*=MuiSelect-selectMenu]').click()
    cy.get('[data-value=customer]').click()

    cy.get('button[name=sign-up]').click()

    cy.location('pathname').should('eq', '/profile')

    cy.get('form')
  })

  it('submits form; is redirected to Customer dashboard', () => {
    cy.get('input[name=first-name]').type(firstName)
    cy.get('input[name=last-name]').type(lastName)

    cy.get('input[name=birthday]')
    cy.get('input[name=gender]')

    cy.get('input[name=address1]').type(address.address1)
    cy.get('input[name=address2]').type(address.address2)
    cy.get('input[name=city]').type(address.city)
    cy.get('input[name=state]').type(address.state)
    cy.get('input[name=country]').type(address.country)
    cy.get('input[name=postCode]').type(address.postCode)
    cy.get('input[name=isBilling]').type(address.isBilling)

    cy.get('button[type=submit').click()

    cy.location('pathname').should('eq', '/customer')
  })

  it('logs out', () => {
    cy.get('button[aria-label="Sign Out"]').click()

    cy.location('pathname').should('eq', '/')
  })
})
