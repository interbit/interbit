const assert = require('assert')
const path = require('path')

const interbit = require('../../')
const log = require('../../log')
const assertChainsConfigured = require('./assertChainsConfigured')
const prepareTestLocation = require('./prepareTestLocation')

const testDeploy = async () => {
  let deployedInterbit = {
    cli: { shutdown: () => {} },
    hypervisor: { stopHyperBlocker: () => {} }
  }
  const env = { ...{}, ...process.env }

  try {
    const { location, cleanup } = prepareTestLocation('deploy')
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

    const buildOptions = {
      config,
      artifacts
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

    const deployOptions = {
      manifest,
      location: artifacts,
      keyPair
    }

    const dbPath = `./db-${Date.now()}`
    process.env.DB_PATH = dbPath

    log.info({ ...deployOptions, dbPath })

    const { cli, hypervisor } = await interbit.deploy(deployOptions)
    deployedInterbit = { cli, hypervisor }
    log.info('Deploy finished')

    assert.ok(cli)
    assert.ok(hypervisor)

    log.success('Deploy returned cli and hypervisor')

    await assertChainsConfigured(cli, manifest.chains)

    log.success('Deployed chains were responsive and configured')
    cleanup()
  } finally {
    await deployedInterbit.cli.shutdown()
    deployedInterbit.hypervisor.stopHyperBlocker()
    process.env = env
  }
}

module.exports = testDeploy
