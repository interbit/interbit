const {
  manifestCovenant: {
    actionCreators: { setManifest }
  }
} = require('interbit-covenant-tools')

const configureJoins = require('./configureJoins')
const {
  getRootChildren,
  getChainIdByAlias,
  getCovenantHashByAlias
} = require('../manifest/manifestSelectors')

process.on('unhandledRejection', reason => {
  console.log(`Reason: ${reason}`)
  console.log(reason)
})

const configureChains = async (cli, interbitManifest) => {
  const childChains = getRootChildren(interbitManifest)
  const childChainEntries = Object.entries(childChains)

  for (const [chainAlias, chainEntry] of childChainEntries) {
    const chainId = getChainIdByAlias(chainAlias, interbitManifest)
    const chainInterface = cli.getChain(chainId)

    // TODO: Set covenants in watchers after cascading deployment is available
    const covenantHash = getCovenantHashByAlias(chainAlias, interbitManifest)
    console.log(
      `Applying covenant ${covenantHash} to ${chainAlias} (${chainId})`
    )
    await cli.applyCovenant(chainId, covenantHash)

    // TODO: Apply interbit-covenant-tools to root #267

    const joins = chainEntry.joins
    if (joins) {
      configureJoins(chainInterface, joins, interbitManifest)
    }

    chainInterface.dispatch({ type: '@@interbit/DEPLOY' })

    // TODO: Only dispatch this to the root once cascading deployment is available
    const setManifestAction = setManifest(interbitManifest)
    console.log(setManifestAction)
    chainInterface.dispatch(setManifestAction)
  }
}

module.exports = configureChains
