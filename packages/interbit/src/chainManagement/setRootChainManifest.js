const {
  rootCovenant: { actionCreators },
  manifest: {
    selectors: { getChainIdByAlias }
  },
  config: {
    selectors: { getChains }
  },
  constants: { ROOT_CHAIN_ALIAS }
} = require('interbit-covenant-tools')

const log = require('../log')

/**
 * Sets the root chain manifest by dispatching the manifest file
 * to the root chain for inclusion in root chain state.
 * @param {Object} cli - The cli of the node containing the root chain.
 * @param {Object} manifest - The manifest file to set.
 * @param {Object} config - The chain configuration file as JSON.
 */
const setRootChainManifest = (cli, manifest, config) => {
  log.info('UPDATING ROOT CHAIN WITH DEPLOYMENT INFO')

  const setManifestAction = actionCreators.setManifest(manifest)

  // NOTE: This is a tmp kludge - cascading manifest updates in a future release
  // will only do the root chain (then root will manage setting other chains)
  const chainEntries = Object.entries(getChains(config))
  chainEntries
    .filter(([, chainConfig]) => chainConfig.applyInterbuffer)
    .forEach(([chainAlias]) => {
      const chainId = getChainIdByAlias(chainAlias, manifest)
      const chainInterface = cli.getChain(chainId)
      waitForBlockToDispatch(chainInterface, setManifestAction)
    })

  const rootChainId = getChainIdByAlias(ROOT_CHAIN_ALIAS, manifest)
  const rootChainInterface = cli.getChain(rootChainId)

  if (!rootChainInterface) {
    log.error(
      `No root chain was found for this deployment at chain ID: ${rootChainId}`
    )
    return
  }

  waitForBlockToDispatch(rootChainInterface, setManifestAction)
}

// Wait for chain to init and make it's first block before setting manifest
const waitForBlockToDispatch = (chainInterface, action) => {
  let unsubscribe = () => {}
  let count = 0
  unsubscribe = chainInterface.subscribe(() => {
    if (count === 0) {
      chainInterface.dispatch(action)
      unsubscribe() // interbit-core 0.7.0 regression - unsubscripe does not unsubscribe #186
      count += 1
    }
  })
}

module.exports = setRootChainManifest
