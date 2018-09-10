const Page = require('./Page')

module.exports = class SignUpPage extends Page {
  constructor(opts) {
    super({ containerSelector: '[class*=SignUp]', ...opts })
  }

  get _email() {
    return this._form.$('input[name=email]')
  }

  get email() {
    return this._email.getValue()
  }

  set email(input) {
    this._email.setValue(input)
  }

  get _password() {
    return this._form.$('input[name=password]')
  }

  get password() {
    return this._password.getValue()
  }

  set password(input) {
    this._password.setValue(input)
  }

  submit() {
    this._form.$('button[type=submit]').click()
  }
}
