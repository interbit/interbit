const watch = require('watch')
const _ = require('lodash')
const {
  getCovenants,
  getChainIdByAlias,
  getCovenantHashByAlias
} = require('../manifest/manifestSelectors')
const deployCovenants = require('./deployCovenants')

const watchCovenants = (cli, interbitConfig, chainManifest) => {
  const covenants = getCovenants(interbitConfig)
  Object.entries(covenants).forEach(([name, config]) => {
    console.log(`Watching for changes in ${config.location}`)

    watch.createMonitor(config.location, monitor => {
      try {
        monitor.on('created', (f, stat) => {
          redeployCovenants(cli, interbitConfig, chainManifest)
        })
        monitor.on('changed', (f, curr, prev) => {
          redeployCovenants(cli, interbitConfig, chainManifest)
        })
        monitor.on('removed', (f, stat) => {
          redeployCovenants(cli, interbitConfig, chainManifest)
        })
      } catch (e) {
        monitor.stop()
        console.error(
          `interbit: Problem redeploying covenant ${name} at ${config.location}`
        )
      }
    })
  })
}

const redeployBuffer = {
  isDeploying: false,
  isDeployPending: false
}

const redeployCovenants = async (cli, manifest) => {
  if (redeployBuffer.isDeploying) {
    redeployBuffer.isDeployPending = true
    return undefined
  } else if (redeployBuffer.isDeployPending) {
    redeployBuffer.isDeployPending = false
  }
  redeployBuffer.isDeploying = true

  console.log('Redeploying updated covenants...')

  const newManifest = manifest
  const covenantHashes = await deployCovenants({
    cli,
    covenantConfig: getCovenants(manifest)
  })

  newManifest.covenants = _.merge(newManifest.covenants, covenantHashes)

  applyUpdates(cli, newManifest, covenantHashes)
  redeployBuffer.isDeploying = false

  return covenantHashes
}

const applyUpdates = (cli, manifest) => {
  Object.entries(manifest).forEach(async ([chainAlias, chainEntry]) => {
    // NOTE: UNTESTED
    const chainId = getChainIdByAlias(chainAlias, manifest)
    const covenantHash = getCovenantHashByAlias(chainAlias, manifest)

    cli.applyCovenant(chainId, covenantHash)

    // TODO: Set manifest
  })
}

module.exports = watchCovenants
