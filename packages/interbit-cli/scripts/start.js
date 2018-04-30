// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const _ = require('lodash')
const path = require('path')
const {
  argOptions,
  configSelectors,
  createChains: { createChainsFromManifest },
  generateManifest,
  getArtifactsLocation,
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

    const opts = getOptions(process.argv)

    const location = path.relative(process.cwd(), opts.artifactsLocation)
    const interbitConfig = getConfig()
    const interbitManifest = getManifest()

    validateConfig(interbitConfig)

    // TODO: If there are no keys in the config...
    // ... generate a pair and insert them as validators in all the chains

    const covenants = configSelectors.getCovenants(interbitConfig)

    const newManifest = generateManifest(
      location,
      interbitConfig,
      covenants,
      interbitManifest
    )

    const { cli } = await startInterbit()

    const covenantHashes = await createChainsFromManifest(
      location,
      cli,
      newManifest,
      opts
    )

    newManifest.covenants = _.merge(newManifest.covenants, covenantHashes)

    console.log(
      'available chains + covenants: ',
      JSON.stringify(
        {
          chains: newManifest.chains,
          covenants: newManifest.covenants
        },
        null,
        2
      )
    )

    setRootChainManifest(cli, newManifest, interbitConfig)

    if (opts.isWatchModeEnabled) {
      watchCovenants(cli, newManifest)
    }

    updateIndexHtmls({
      config: interbitConfig,
      chains: newManifest.chains
    })

    // TODO: Watch the chains for manifest changes #267
    // watchChain(cli, chainInterface)
  } catch (e) {
    console.error(`ERROR: ${e.message}`)
    process.exit(1)
  }
}

const getOptions = argv => ({
  isDevModeEnabled: true, // isArg(argv, argOptions.DEV),
  isWatchModeEnabled: !isArg(argv, argOptions.NO_WATCH),
  port: getArg(argv, argOptions.PORT),
  dbPath: getArg(argv, argOptions.DB_PATH),
  artifactsLocation: getArtifactsLocation()
})

startInterbitNode()
