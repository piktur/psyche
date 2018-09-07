/* eslint-disable no-console */

require('dotenv').config({
  path: require('path').resolve(process.cwd(), '.env.test')
})

const getPort = require('get-port')

process.env.NODE_ENV = 'test'
process.env.TEST_BASE_URL = `http://localhost:${process.env.PORT}`

const WDIOLauncher = require('webdriverio').Launcher

async function run() {
  const wdio = new WDIOLauncher(process.argv[2], {
    spec: process.argv[3],
    port: await getPort(),
  })

  try {
    const code = await wdio.run()
    process.exit(code)
  } catch (err) {
    console.error('Error starting testrunner: %s', err.message)
    console.error(err.stacktrace)
    process.exit(1)
  }
}

run()
