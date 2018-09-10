const { assert } = require('chai')
const LoginPage = require('./page_objects/LoginPage')
const DashboardPage = require('./page_objects/DashboardPage')

function buildUp() {
}

function tearDown() {
}

describe('Login', function() {
  this.retries(0)

  before(buildUp)
  after(tearDown)

  const loginPage = new LoginPage()
  const dashboardPage = new DashboardPage()

  it('visits /login', () => {
    loginPage.open({ pathname: '/login' })
    loginPage.waitForLoad()

    assert.isTrue(loginPage.isExisting)
  })

  it('enters credentials', () => {
    loginPage.email = 'test@example.com'
    loginPage.password = 'password'
    loginPage.submit()
  })

  xit('redirects to Dashboard', () => {
    assert.equal(browser.url, '/')

    dashboardPage.waitForVisible()

    assert.isTrue(dashboardPage.isExisting)
  })
})
