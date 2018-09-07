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
    this._containerSelector = containerSelector

    // page objects can exist in a heirarchy
    this.parent = parent
  }

  get selector() {
    if (typeof this._containerSelector === 'string') {
      if (this.parent) {
        return `${this.parent.selector} ${this._containerSelector}`
      }

      return this._containerSelector
    } else {
      throw new Error('_containerSelector not set')
    }
  }

  get _el() {
    return browser.element(this.selector)
  }

  get _loaderEls() {
    throw Error
  }

  get pageTitle() {
    throw Error
  }

  get _form() {
    throw Error
  }

  get _error() {
    throw Error
  }

  get _success() {
    throw Error
  }

  get hasErrors() {
    throw Error
  }

  get isSuccess() {
    throw Error
  }

  get isSubmitted() {
    throw Error
  }

  get isExisting() {
    try {
      return this.waitForExist({ timeout: 'animation' })
    } catch (err) {
      return false
    }
  }

  get isVisible() {
    try {
      return this.waitForVisible({ timeout: 'animation' })
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

  open({ pathname, authToken, query = {} }) {
    const pageURL = new URL(process.env.TEST_BASE_URL)

    pageURL.pathname = pathname

    if (authToken) {
      query.authToken = authToken
    }

    Object.keys(query).forEach(key => {
      pageURL.searchParams.set(key, query[key])
    })

    browser.url(pageURL.toString())
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
      loaders = browser.elements(`${this.selector} .loading`)
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
  waitForSnackbar(key = 'notification', onElementExist) {
    const el = browser.element('body > .notification')

    el.waitForVisible(this.timeout(key))

    if (typeof onElementExist === 'function') {
      onElementExist(el)
    }

    return el.waitForVisible(this.timeout(key), true)
  }
}
