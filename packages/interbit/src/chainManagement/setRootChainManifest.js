const {
  rootCovenant: {
    actionCreators: { setManifest }
  }
} = require('interbit-covenant-tools')

const setRootChainManifest = async (cli, manifest) => {
  console.log('UPDATING ROOT CHAIN WITH DEPLOYMENT INFO')

  const rootChainInterface = cli.getChain(manifest.chains.interbitRoot)

  if (!rootChainInterface) {
    // TODO: Make this a proper thrown error with #263
    console.warn(`No root chain was found for this deployment`)
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
