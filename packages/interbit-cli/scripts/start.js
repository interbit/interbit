// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  argOptions,
  createChains: { createChainsFromConfig },
  generateDeploymentDetails,
  getConfig,
  getManifest,
  isArg,
  getArg,
  logo,
  startInterbit,
  setRootChainManifest,
  updateIndexHtmls,
  validateConfig,
  // watchChain,
  watchCovenants
} = require('interbit')

const startInterbitNode = async () => {
  try {
    console.log(logo)

    const options = getOptions(process.argv)
    const interbitConfig = getConfig()

    // eslint-disable-next-line
    const interbitManifest = getManifest()
    // TODO: Use the manifest as initial variable resolution for generating the new one #262

    validateConfig(interbitConfig)

    const { cli } = await startInterbit(undefined, options)
    // TODO: This create based on config should only run in dev mode, else run chains based on manifest #276
    const { chainManifest, covenantHashes } = await createChainsFromConfig(
      cli,
      interbitConfig
    )

    // TODO: This manifest mock is no longer required
    const deploymentDetails = generateDeploymentDetails(
      chainManifest,
      covenantHashes
    )

    console.log('available chains + covenants: ', deploymentDetails)

    setRootChainManifest(cli, deploymentDetails, interbitConfig)

    if (options.isDevModeEnabled && options.isWatchModeEnabled) {
      watchCovenants(cli, interbitConfig, chainManifest)
    }

    if (!options.isDevModeEnabled) {
      // TODO: We are not in dev mode so output the diff'd manifest

      // TODO: Use the manifest to update index.html instead of "deploymentDetails"
      updateIndexHtmls({
        config: interbitConfig, // manifest here
        chains: deploymentDetails.chains
      })
    } else {
      updateIndexHtmls({
        config: interbitConfig,
        chains: deploymentDetails.chains
      })
    }

    // TODO: Watch the chains for manifest changes #267
    // Blocked by #258 #336
    // watchChain(cli, chainInterface)
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

startInterbitNode()
