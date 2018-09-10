const SignUpPage = require('./SignUpPage')

module.exports = class LoginPage extends SignUpPage {
  constructor(opts) {
    super({ containerSelector: 'div[class*=SignIn]', ...opts })
  }
}
