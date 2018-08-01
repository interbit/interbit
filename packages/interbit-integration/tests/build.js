const assert = require('assert')
const fs = require('fs-extra')
const path = require('path')
const uuid = require('uuid')
const interbit = require('interbit')

const log = require('../log')

const testBuild = async () => {
  const location = path.join('tmp', uuid.v4())
  const options = {
    // eslint-disable-next-line
    config: require('../interbit.config'),
    artifacts: path.join(location, 'dist')
  }

  await interbit.build(options)

  log.info('Done building...')

  const isBuildBuilt = await fs.exists(options.artifacts)
  assert.ok(isBuildBuilt, 'Build dir does not exist')

  log.success('Build was build in correct location')

  // eslint-disable-next-line
  const manifest = require(path.join(
    process.cwd(),
    options.artifacts,
    'interbit.manifest.json'
  ))
  log.info(manifest)

  assert.deepEqual(manifest.peers, options.config.peers)

  const configuredCovenants = Object.keys(options.config.covenants)
  const builtCovenants = Object.keys(manifest.covenants)
  for (const covenantAlias of builtCovenants) {
    const covenantFilename = path.join(
      options.artifacts,
      manifest.covenants[covenantAlias].filename
    )
    const doesCovenantExist = await fs.exists(covenantFilename)

    assert.ok(
      doesCovenantExist,
      `${covenantAlias} was packed at specified filepath`
    )
  }

  log.success('Covenants were packed in manifest locations')

  assert.deepEqual(builtCovenants, [...configuredCovenants, 'interbitRoot'])

  log.success('All configured covenants and root were packed')

  const configuredChains = Object.keys(options.config.staticChains)
  const builtChains = Object.keys(manifest.manifest.interbitRoot.chains)

  assert.deepEqual(
    builtChains,
    configuredChains,
    'Chains in manifest were not correctly configured'
  )

  log.success(
    'All configured chains were added to manifest as children of the root'
  )
  log.success('Build was successful')

  log.info('Cleaning up...')
  await fs.remove('tmp')
  log.info('... cleaned up.')
}

module.exports = testBuild
