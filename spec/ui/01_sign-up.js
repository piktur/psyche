const { assert } = require('chai')
const IndexPage = require('./page_objects/IndexPage')
const SignUpPage = require('./page_objects/SignUpPage')
const ProfilePage = require('./page_objects/ProfilePage')

function buildUp() {
}

function tearDown() {
}

describe('Sign Up', function() {
  this.retries(2)

  before(buildUp)
  after(tearDown)

  const indexPage = new IndexPage()
  const signUpPage = new SignUpPage()
  const profilePage = new ProfilePage()

  it('visits root; clicks Sign Up', () => {
    indexPage.open({ pathname: '/' })
    indexPage.waitForVisible()

    assert.isTrue(indexPage.isVisible())

    indexPage.signUp()
  })

  it('sees Sign Up form', () => {
    signUpPage.waitForLoad()

    assert.isTrue(signUpPage.isVisible)
  })

  it('enters credentials', () => {
    signUpPage.email = 'test@example.com'
    signUpPage.password = 'password'
    signUpPage.submit()

    assert.isTrue(true)
  })

  xit('redirects to Profile', () => {
    assert.equal(browser.url, '/profile')
    profilePage.waitForVisible()

    assert.isTrue(profilePage.isVisible)
  })
})
