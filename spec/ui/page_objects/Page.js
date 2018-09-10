const { URL } = require('url')

const TIMEOUTS = {
  minAnimate: 500,
  maxAnimate: 1000,
  network: 5 * 1000,
  service: 20 * 1000, // e.g. Stripe
  cdn: 15 * 1000,
  notification: 10 * 1000,
}

// Base Page object
// @see http://webdriver.io/guide/testrunner/pageobjects.html
module.exports = class Page {
  constructor({ parent, containerSelector } = {}) {
    // page objects can exist in a heirarchy
    this.parent = parent
    this._containerSelector = containerSelector

    if (typeof this._containerSelector === 'string') {
      if (this.parent) {
        this.selector = `${this.parent.selector} ${this._containerSelector}`
      }

      this.selector = this._containerSelector
    } else {
      throw new Error('selector not set')
    }
  }

  get _el() {
    return browser.$(this.selector)
  }

  get _loaderEls() {
    return browser.elements(`${this.selector} > div[class*=Loader]`)
  }

  get pageTitle() {
    throw Error('NOT_IMPLEMENTED')
  }

  get _form() {
    return this._el.$('form')
  }

  get _error() {
    throw Error('NOT_IMPLEMENTED')
  }

  get _success() {
    throw Error('NOT_IMPLEMENTED')
  }

  get hasErrors() {
    throw Error('NOT_IMPLEMENTED')
  }

  get isSuccess() {
    throw Error('NOT_IMPLEMENTED')
  }

  get isSubmitted() {
    throw Error('NOT_IMPLEMENTED')
  }

  get isNotValid() {
    return browser.elements('[aria-invalid=true]').waitForVisible(this.timeout())
  }

  get isValid() {
    return !browser.elements('[aria-invalid=true').isExisting()
  }

  get isExisting() {
    try {
      return this.waitForExist('animation')
    } catch (err) {
      return false
    }
  }

  get isVisible() {
    try {
      return this.waitForVisible('animation')
    } catch (err) {
      return false
    }
  }

  get isLoading() {
    return this._loaderEls.isExisting()
  }

  get isMobile() {
    return browser.desiredCapabilities.isMobile
  }

  open({ pathname = '/', query = {} }) {
    const url = new URL(process.env.BASE_URL)

    url.pathname = pathname

    Object.keys(query).forEach(key => {
      url.searchParams.set(key, query[key])
    })

    browser.url(url.toString())
  }

  timeout(key = 'network') {
    const ms = TIMEOUTS[key]

    if (typeof ms !== 'number') {
      throw Error(`timeout "${key}" not supported`)
    }

    return ms
  }

  waitForExist(key) {
    return this._el.waitForExist(this.timeout(key))
  }

  waitForVisible(key) {
    return this._el.waitForVisible(this.timeout(key))
  }

  waitForAnimation(key = 'maxAnimate') {
    return browser.pause(this.timeout(key))
  }

  waitForLoad(key, { recursive } = {}) {
    let loaders

    this.waitForVisible(key)

    if (recursive) {
      // all loaders in this and descendant Pages
      loaders = browser.elements(`${this.selector} div[class*=Loader]`)
    } else {
      // only loaders referenced by this Page
      loaders = this._loaderEls
    }

    // wait for loaders to disappear
    loaders.waitForVisible(this.timeout(key), true)

    return this.waitForVisible(key)
  }

  waitForUnload(key) {
    return this._el.waitForVisible(this.timeout(key), true)
  }

  waitForErrors(key) {
    return this._error.waitForVisible(this.timeout(key))
  }

  /**
   * @param {Object} options
   * @param {String} options.key - The TIMEOUT key
   * @param {Function} onElementExist - Receives existent element; called between element transition in/out.
   */
  waitForNotification(key = 'notification', onElementExist) {
    const el = browser.element('[class*=Snackbar]')

    el.waitForVisible(this.timeout(key))

    if (typeof onElementExist === 'function') {
      onElementExist(el)
    }

    return el.waitForVisible(this.timeout(key), true)
  }
}
