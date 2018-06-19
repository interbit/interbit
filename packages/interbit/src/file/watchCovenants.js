const watch = require('watch')
const {
  config: {
    selectors: { getCovenants, getChainByAlias }
  }
} = require('interbit-covenant-tools')

const {
  generateDeploymentDetails,
  deployCovenants
} = require('../chainManagement')

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

const redeployCovenants = async (cli, interbitConfig, chainManifest) => {
  console.log('attempted to redeploy')
  if (redeployBuffer.isDeploying) {
    redeployBuffer.isDeployPending = true
    return undefined
  } else if (redeployBuffer.isDeployPending) {
    redeployBuffer.isDeployPending = false
  }
  redeployBuffer.isDeploying = true

  console.log('Redeploying updated covenants...')

  const covenantHashes = await deployCovenants({
    cli,
    covenantConfig: getCovenants(interbitConfig)
  })

  applyUpdates(cli, chainManifest, interbitConfig, covenantHashes)
  redeployBuffer.isDeploying = false

  return covenantHashes
}

const applyUpdates = (cli, chainManifest, interbitConfig, covenantHashes) => {
  Object.entries(chainManifest).forEach(async ([chainAlias, chainEntry]) => {
    const aliasedChain = getChainByAlias(chainAlias, interbitConfig)
    const covenantAlias = aliasedChain.covenant
    const covenantHash = covenantHashes[covenantAlias]

    cli.applyCovenant(chainEntry.chainId, covenantHash)

    const isDefaultChain = aliasedChain.isDefaultChain
    if (isDefaultChain) {
      const defaultChain = await cli.getChain(chainEntry.chainId)
      updateManifest(chainManifest, covenantHashes, defaultChain)
    }
  })
}

const updateManifest = (chainManifest, covenantHashes, defaultChain) => {
  const deploymentDetails = generateDeploymentDetails(
    chainManifest,
    covenantHashes
  )
  console.log('Updated deploymentDetails ', deploymentDetails)

  // TODO: dispatch updated deployment deets to the defaultChain
}

module.exports = watchCovenants
