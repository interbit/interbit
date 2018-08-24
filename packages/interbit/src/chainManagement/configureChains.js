const {
  rootCovenant: {
    actionCreators: { setManifest }
  },
  manifest: {
    selectors: { getRootChildren, getChainIdByAlias, getCovenantHashByAlias }
  }
} = require('interbit-covenant-tools')

const log = require('../log')
const configureJoins = require('./configureJoins')

process.on('unhandledRejection', reason => {
  log.error(`Caught unhandled rejection. Reason: ${reason}`)
  log.error(reason)
})

/**
 * Configures the chains on a node to the specifications in the Interbit
 * manifest file passed in params. Applies covenants, configures joins, and
 * dispatches the manifest to the chain.
 * @param {Object} cli - Interbit cli for the node to configure
 * @param {Object} interbitManifest - Manifest file specifying configuration
 */
const configureChains = async (cli, interbitManifest) => {
  const childChains = getRootChildren(interbitManifest)
  const childChainEntries = Object.entries(childChains)

  for (const [chainAlias, chainEntry] of childChainEntries) {
    const chainId = getChainIdByAlias(chainAlias, interbitManifest)
    const chainInterface = cli.getChain(chainId)

    // TODO: Set covenants in watchers after cascading deployment is available
    const covenantHash = getCovenantHashByAlias(chainAlias, interbitManifest)
    log.info(`Applying covenant ${covenantHash} to ${chainAlias} (${chainId})`)
    await cli.applyCovenant(chainId, covenantHash)

    // TODO: Apply interbit-covenant-tools to root #267

    const joins = chainEntry.joins
    if (joins) {
      configureJoins(chainInterface, joins, interbitManifest)
    }

    chainInterface.dispatch({ type: '@@interbit/DEPLOY' })

    // TODO: Only dispatch this to the root once cascading deployment is available
    const setManifestAction = setManifest(interbitManifest)
    log.info('Set the manifest')
    log.action(setManifestAction)
    chainInterface.dispatch(setManifestAction)
  }

  log.success('Chains were configured')
}

module.exports = configureChains
