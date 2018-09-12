const Page = require('./Page')

module.exports = class IndexPage extends Page {
  constructor(opts) {
    super({ containerSelector: 'main[class*=IndexPage]', ...opts })
  }

  get _signUpBtn() {
    return this._el.$('a[class=SignUp]')
  }

  get _loginBtn() {
    return this._el.$('a[class=Login]')
  }

  signUp() {
    this._signUpBtn.click()
  }

  login() {
    this._loginBtn.click()
  }
}
