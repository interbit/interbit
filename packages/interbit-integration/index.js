const log = require('./log')
const start = require('./tests/start')

const doTheThing = async () => {
  try {
    await start()
  } catch (e) {
    log.error(e)
    process.exit(1)
  }
}

doTheThing()
