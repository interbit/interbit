const {
  argOptions,
  createChains: { createChainsFromConfig },
  generateDeploymentDetails,
  getConfig,
  isArg,
  getArg,
  logo,
  startInterbit,
  setRootChainManifest,
  updateIndexHtmls,
  validateConfig,
  watchCovenants
} = require('interbit')

const startInterbitNode = async () => {
  try {
    console.log(logo)
    const options = getOptions(process.argv)
    const interbitConfig = getConfig()

    validateConfig(interbitConfig)

    const { hypervisor, cli } = await startInterbit(undefined, options)
    const { chainManifest, covenantHashes } = await createChainsFromConfig(
      cli,
      interbitConfig
    )

    const deploymentDetails = await generateDeploymentDetails(
      chainManifest,
      covenantHashes
    )

    console.log('available chains + covenants: ', deploymentDetails)

    setRootChainManifest(cli, deploymentDetails, interbitConfig)

    if (options.isDevModeEnabled) {
      // Makes it easier to spin up the environment for development
      updateIndexHtmls({
        config: interbitConfig,
        chains: deploymentDetails.chains
      })

      if (options.isWatchModeEnabled) {
        watchCovenants(cli, interbitConfig, chainManifest)
      }
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

const getOptions = argv => ({
  isDevModeEnabled: isArg(argv, argOptions.DEV),
  isWatchModeEnabled: !isArg(argv, argOptions.NO_WATCH),
  port: getArg(argv, argOptions.PORT),
  dbPath: getArg(argv, argOptions.DB_PATH)
})

module.exports = startInterbitNode
