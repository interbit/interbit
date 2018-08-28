const {
  manifest: {
    selectors: { getChains, getCovenantHashByAlias }
  },
  coreCovenant: {
    selectors: { covenantHash: getCovenantHash }
  }
} = require('interbit-covenant-tools')
const log = require('../log')

/**
 * Checks each of the configured static chains loaded on this cli for an
 * initial covenant. If the chain does not have a covenant, it applies
 * the covenant specified in the manifest to that chain.
 * @param {Object} cli - The cli to interact with the Interbit node
 * @param {Object} manifest - The manifest configuration applied to this node
 */
const initializeCovenants = async (cli, manifest, options) => {
  log.info('INITIALIZING COVENANTS')
  const chainEntries = Object.entries(getChains(manifest))
  const covenantPromises = []
  for (const [chainAlias, chainId] of chainEntries) {
    const chainInterface = cli.getChain(chainId)
    const state = chainInterface.getState()
    log.info(`STATE FOR ${chainAlias}:`)
    log.info(JSON.stringify(state, null, 2))
    const currentCovenantHash = getCovenantHash(state)
    if (!currentCovenantHash) {
      const configuredCovenantHash = getCovenantHashByAlias(
        chainAlias,
        manifest
      )
      log.info(
        `No covenant found on ${chainAlias}... applying covenant ${configuredCovenantHash}`
      )
      const covenantPromise = cli.applyCovenant(chainId, configuredCovenantHash)
      covenantPromises.push(covenantPromise)
    }
  }
  await Promise.all(covenantPromises)
}

module.exports = initializeCovenants
