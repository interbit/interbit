const {
  coreCovenant: {
    actionCreators: { destroy }
  },
  manifest: {
    selectors: { getRootChainId, getManifest, getChainAliases, getChains }
  }
} = require('interbit-covenant-tools')

/**
 * Destroys the chains that have been removed from the manifest file.
 * This is done by comparing the manifest in the root chain's state
 * to the manifest passed into params. Any that are in root chain state
 * but are not in params are destroyed if this cli has access to them.
 * This function should be called prior to setting a new manifest on the
 * root chain.
 * @param {Object} cli - The cli to destroy chains on
 * @param {Object} manifest - The new manifest to compare with the root manifest
 */
const destroyRemovedChains = (cli, manifest) => {
  const rootChainId = getRootChainId(manifest)
  const rootChainInterface = cli.getChain(rootChainId)
  const rootChainState = rootChainInterface.getState()
  const rootChainManifest = getManifest(rootChainState)

  if (!rootChainManifest) {
    return
  }

  const chainAliasesConfiguredOnRoot = getChainAliases(rootChainManifest)
  const chainEntries = Object.entries(getChains(manifest))
  const removedChains = chainEntries.filter(
    chainEntry => !chainAliasesConfiguredOnRoot.includes(chainEntry[0])
  )

  for (const removedChain of removedChains) {
    const removedChainInterface = cli.getChain(removedChain)
    if (removedChainInterface) {
      const destroyAction = destroy()
      removedChainInterface.dispatch(destroyAction)
    }
  }
}

module.exports = destroyRemovedChains
