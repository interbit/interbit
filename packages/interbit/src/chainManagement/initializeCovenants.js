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
 * @param {Object} options - Additional options related to this node
 */
const initializeCovenants = async (cli, manifest, options) => {
  console.log('INITIALIZING COVENANTS')
  const chainEntries = Object.entries(getChains(manifest))
  for (const [chainAlias, chainId] of chainEntries) {
    const chainInterface = cli.getChain(chainId)
    const state = chainInterface.getState()
    console.log(`STATE FOR ${chainAlias}:`)
    console.log(JSON.stringify(state, null, 2))
    const currentCovenantHash = getCovenantHash(state)
    if (!currentCovenantHash) {
      const configuredCovenantHash = getCovenantHashByAlias(
        chainAlias,
        manifest
      )
      console.log(
        `No covenant found on ${chainAlias}... applying covenant ${configuredCovenantHash}`
      )
      cli.applyCovenant(chainId, configuredCovenantHash)
    }
  }
}

module.exports = initializeCovenants
