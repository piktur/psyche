const Page = require('./Page')

module.exports = class DashboardPage extends Page {
  constructor(opts) {
    super({ containerSelector: 'div[class*=Dashboard]', ...opts })
  }
}
