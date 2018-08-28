const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')

const interbit = require('../../')
const log = require('../../log')
const assertChainsConfigured = require('./assertChainsConfigured')
const prepareTestLocation = require('./prepareTestLocation')

const testDeploy = async () => {
  let interbitCleanup = () => {}
  let buildDbPath
  let deployDbPath
  const dbCleanup = async dbPath => {
    if (dbPath) {
      await fs.remove(dbPath)
    }
  }

  try {
    const { location, cleanup: locationCleanup } = prepareTestLocation('deploy')
    const artifacts = path.join(location, 'dist')

    const keysOptions = {
      filename: path.join(location, 'keys.json')
    }
    await interbit.keys(keysOptions)

    // eslint-disable-next-line
    const keyPair = require(path.join(process.cwd(), keysOptions.filename))

    // eslint-disable-next-line
    const config = require('./interbit.config')
    config.adminValidators = [keyPair.publicKey]
    config.staticChains.first.config.validators = [keyPair.publicKey]
    config.staticChains.second.config.validators = [keyPair.publicKey]

    buildDbPath = `./db-${Date.now()}`
    const buildOptions = {
      config,
      artifacts,
      dbPath: buildDbPath
    }
    await interbit.build(buildOptions)

    log.info('Pre-deploy build completed')

    // eslint-disable-next-line
    const manifest = require(path.join(
      process.cwd(),
      artifacts,
      'interbit.manifest.json'
    ))
    log.info(manifest)

    deployDbPath = `./db-${Date.now()}`
    const deployOptions = {
      manifest,
      location: artifacts,
      keyPair,
      dbPath: deployDbPath
    }

    log.info(deployOptions)

    const { cli, hypervisor, cleanup } = await interbit.deploy(deployOptions)
    interbitCleanup = cleanup
    log.success('Deploy finished')

    assert.ok(cli)
    assert.ok(hypervisor)

    log.success('Deploy returned cli and hypervisor')

    await assertChainsConfigured(cli, manifest.chains)

    log.success('Deployed chains were responsive and configured')
    locationCleanup()
  } finally {
    await interbitCleanup()
    await dbCleanup(buildDbPath)
    await dbCleanup(deployDbPath)
  }
}

module.exports = testDeploy
