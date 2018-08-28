const {
  rootCovenant: {
    actionCreators: { setManifest }
  }
} = require('interbit-covenant-tools')

const log = require('../log')

/**
 * Sets the root chain manifest by dispatching the manifest file
 * to the root chain for inclusion in root chain state.
 * @param {Object} cli - The cli of the node containing the root chain.
 * @param {Object} manifest - The manifest file to set.
 * @param {Object} config - The chain configuration file as JSON.
 */
const setRootChainManifest = async (cli, manifest, config) => {
  log.info('UPDATING ROOT CHAIN WITH DEPLOYMENT INFO')

  const rootChainId = manifest.chains.interbitRoot
  const rootChainInterface = cli.getChain(rootChainId)

  if (!rootChainInterface) {
    // TODO: Make this a proper thrown error with #263
    log.error(
      `No root chain was found for this deployment at chain ID: ${rootChainId}`
    )
    return
  }

  await detectBlocking(rootChainInterface, 10000)

  const setManifestAction = setManifest(manifest)
  console.log(setManifestAction)
  await rootChainInterface.dispatch(setManifestAction)
}

const detectBlocking = (chain, maxTime = 5000) =>
  new Promise((resolve, reject) => {
    let unsubscribe = () => {}
    const timeout = setTimeout(() => {
      reject(new Error('Chain is not blocking'))
      unsubscribe()
    }, maxTime)
    unsubscribe = chain.blockSubscribe(() => {
      unsubscribe()
      timeout && clearTimeout(timeout)
      resolve(true)
    })
  })

module.exports = setRootChainManifest
