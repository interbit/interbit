const {
  manifest: {
    selectors: { getChains, getCovenantHashByAlias }
  },
  coreCovenant: {
    selectors: { covenantHash: getCovenantHash }
  }
} = require('interbit-covenant-tools')

/**
 * Checks each of the configured static chains loaded on this cli for an
 * initial covenant. If the chain does not have a covenant, it applies
 * the covenant specified in the manifest to that chain.
 * @param {Object} cli - The cli to interact with the Interbit node
 * @param {Object} manifest - The manifest configuration applied to this node
 */
const initializeCovenants = async (cli, manifest) => {
  const chainEntries = Object.entries(getChains(manifest))
  const covenantPromises = []
  for (const [chainAlias, chainId] of chainEntries) {
    const chainInterface = cli.getChain(chainId)
    const state = chainInterface.getState()
    const currentCovenantHash = getCovenantHash(state)

    if (!currentCovenantHash) {
      const configuredCovenantHash = getCovenantHashByAlias(
        chainAlias,
        manifest
      )
      const covenantPromise = cli.applyCovenant(chainId, configuredCovenantHash)
      covenantPromises.push(covenantPromise)
    }
  }
  await Promise.all(covenantPromises)
}

module.exports = initializeCovenants
