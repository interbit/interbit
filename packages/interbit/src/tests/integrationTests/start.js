const assert = require('assert')
const interbit = require('../../')

const assertChainsConfigured = require('./assertChainsConfigured')
const log = require('../../log')

const testStart = async () => {
  let interbitCleanup = () => {}

  try {
    const options = {
      // eslint-disable-next-line
      config: require('./interbit.config'),
      noWatch: true,
      dbPath: `./db-${Date.now()}`
    }

    log.info(options)

    const { cli, hypervisor, chainManifest, cleanup } = await interbit.start(
      options
    )
    interbitCleanup = cleanup

    assert.ok(cli)
    assert.ok(hypervisor)
    assert.ok(chainManifest)

    log.info('BOOTED THE INTERBITS WEOOOO!!!')
    log.info(chainManifest)

    await assertChainsConfigured(cli, chainManifest)

    log.success(
      'interbit.start(options): First joined to second and shared state'
    )
  } finally {
    await interbitCleanup()
  }
}

module.exports = testStart
