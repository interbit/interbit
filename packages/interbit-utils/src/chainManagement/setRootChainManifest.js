const {
  covenant: { actionCreators }
} = require('interbit-core-buffer')

const { getChains } = require('../config/configSelectors')
const { getChainIdByAlias } = require('../manifest/manifestSelectors')
const { ROOT_CHAIN_ALIAS } = require('./constants')

const setRootChainManifest = (cli, manifest, config) => {
  console.log('UPDATING ROOT CHAIN WITH DEPLOYMENT INFO')

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
    console.error(
      `No root chain was found for this deployment at chain ID: ${rootChainId}`
    )
    return
  }

  waitForBlockToDispatch(rootChainInterface, setManifestAction)
}

// Wait for chain to init and make it's first block before setting manifest
const waitForBlockToDispatch = (chainInterface, action) => {
  let unsubscribe = () => {}
  unsubscribe = chainInterface.subscribe(() => {
    chainInterface.dispatch(action)
    unsubscribe()
  })
}

module.exports = setRootChainManifest
