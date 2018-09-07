/* eslint-disable no-console */

const os = require('os')
const path = require('path')
const uuid = require('uuid')
const chalk = require('chalk')

const debug = !!process.env.DEBUG
const baseUrl = process.env.TEST_BASE_URL

function logBrowserOutput() {
  const log = browser.log('browser')

  if (log.value && log.value.length) {
    log.value.forEach((e) => console.log(`[${e.level}] ${e.message}`))
  }
}

// @see https://peter.sh/experiments/chromium-command-line-switches
const chromeArgs = [
  '--url-base=/wd/hub',
  // @see https://github.com/Codeception/CodeceptJS/issues/561
  '--proxy-server=\'direct://\'',
  '--proxy-bypass-list=*',
]

if (debug) {
  chromeArgs.push(`--remote-debugging-port=${process.debugPort}`)
} else {
  chromeArgs.push('--headless')
}

class Device {
  constructor(opts) {
    this.browserName = 'chrome'
    // do not wait for resources to load before continuing test
    this.pageLoadStrategy = 'none'

    Object.assign(this, opts)

    this.chromeOptions = {
      args: [
        ...chromeArgs,
      ],
    }

    this.isMobile = this.cssDeviceType === 'mobile'

    if (!debug) {
      const { width, height } = this.viewportSize
      this.chromeOptions.args.push(`--window-size=${width},${height}`)
    }

    if (this.isMobile) {
      this.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1'
      this.chromeOptions.args.push(`--user-agent=${this.userAgent}`)
    }
  }
}

const phablet = new Device({
  cssDeviceType: 'phablet',
  viewportSize: {
    width: 1024,
    height: 768,
  },
})

const mobile = new Device({
  cssDeviceType: 'mobile',
  viewportSize: {
    width: 320,
    height: 480 + 150, // account for chrome's toolbar size
  },
})

let capabilities = [phablet, mobile]

if (process.env.MOBILE_ONLY) {
  capabilities = [mobile]
} else if (process.env.PHABLET_ONLY) {
  capabilities = [phablet]
}

exports.config = {
  specs: [
    path.resolve(process.cwd(), 'spec/ui/**/*.js'),
  ],
  exclude: [],
  sync: true,
  logLevel: 'silent',
  baseUrl,
  coloredLogs: true,
  waitforTimeout: 20000,
  waitforInterval: 100,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec'],
  deprecationWarnings: false,
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    bail: true,
  },
  bail: 1,
  path: '/wd/hub', // must be absolute
  capabilities,
  services: ['chromedriver'],
  chromeDriverArgs: chromeArgs,
  maxInstances: debug ? 1 : capabilities.length,

  onPrepare(config, capabilities) {
    // Assign available port to chrome instance; avoids collision if running more than one suite.
    config.chromeDriverArgs.push(`--port=${config.port}`)
    capabilities.forEach(device => {
      device.chromeOptions.args.push(`--port=${config.port}`)
    })
  },

  beforeSuite: () => {
    if (debug) {
      // setViewportSize does not seem to play nice with Chrome
      browser.windowHandleSize(browser.desiredCapabilities.viewportSize)
    }
  },

  afterTest: test => {
    if (!test.passed) {
      const screenshotPath = path.resolve(os.tmpdir(), `${uuid.v4()}.png`)
      const report = [`✖ ${test.parent} ${test.title}\n`, ` Screenshot: ${screenshotPath}\n`]

      try {
        browser.saveScreenshot(screenshotPath)

        if (test.err) {
          report.splice(1, 0, ` Error: ${chalk.bold(test.err.message)}\n`)
        }

        console.log(chalk.red(...report))
      } catch (err) {
        console.error(err)
      }
    }
  },

  onError: () => {
    if (debug) {
      logBrowserOutput()
    }
  },
}

if (debug) {
  // Ensure remote debugger port cleared if SIGINT received
  // @see https://github.com/nodejs/node/blob/master/test/sequential/test-inspector-enabled.js
  process.on('SIGINT', process._debugEnd)

  Object.assign(exports.config, {
    debug,
    execArgv: ['--inspect'],
  })
}
