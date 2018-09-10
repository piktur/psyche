const Page = require('./Page')

module.exports = class SignUpPage extends Page {
  constructor(opts) {
    super({ containerSelector: '[class*=Profile]', ...opts })
  }

  get _firstName() {
    return this._form.$('input[name=firstName]')
  }

  get firstName() {
    return this._firstName.getValue()
  }

  set firstName(input) {
    this._firstName.setValue(input)
  }

  get _lastName() {
    return this._form.$('input[name=lastName]')
  }

  get lastName() {
    return this._lastName.getValue()
  }

  set lastName(input) {
    this._lastName.setValue(input)
  }

  get _birthday() {
    return this._form.$('input[name=birthday]')
  }

  get birthday() {
    return this._birthday.getValue()
  }

  set birthday(input) {
    this._birthday.setValue(input)
  }

  submit() {
    this._form.$('button[type=submit]').click()
  }
}
