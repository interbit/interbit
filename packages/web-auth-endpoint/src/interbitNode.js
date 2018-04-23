const {
  createChains: { createChainsFromConfig },
  generateDeploymentDetails,
  getConfig,
  logo,
  startInterbit,
  updateIndexHtmls,
  validateConfig,
  watchCovenants
} = require('interbit-utils')

const startInterbitNode = async () => {
  try {
    console.log(logo)
    const interbitConfig = getConfig()

    validateConfig(interbitConfig)

    const { hypervisor, cli } = await startInterbit()
    const { chainManifest, covenantHashes } = await createChainsFromConfig(
      cli,
      interbitConfig
    )

    const deploymentDetails = await generateDeploymentDetails(
      chainManifest,
      covenantHashes
    )

    console.log('available chains + covenants: ', deploymentDetails)

    if (process.env.COVENANT_DEV_MODE === 'true') {
      // Makes it easier to spin up the environment for development
      updateIndexHtmls({
        config: interbitConfig,
        chains: deploymentDetails.chains
      })

      watchCovenants(cli, interbitConfig, chainManifest)
    }

    return {
      hypervisor,
      cli,
      chains: deploymentDetails.chains,
      covenants: deploymentDetails.covenants
    }
  } catch (e) {
    console.error(`ERROR: ${e.message}`)
    process.exit(1)
  }
}

module.exports = startInterbitNode
