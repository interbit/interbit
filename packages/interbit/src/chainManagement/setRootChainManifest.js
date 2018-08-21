const {
  rootCovenant: {
    actionCreators: { setManifest }
  }
} = require('interbit-covenant-tools')

const setRootChainManifest = (cli, manifest) => {
  console.log('UPDATING ROOT CHAIN WITH DEPLOYMENT INFO')

  const rootChainInterface = cli.getChain(manifest.chains.interbitRoot)

  if (!rootChainInterface) {
    // TODO: Make this a proper thrown error with #263
    console.warn(`No root chain was found for this deployment`)
    return
  }

  const setManifestAction = setManifest(manifest)
  console.log(setManifestAction)
  waitForBlockToDispatch(rootChainInterface, setManifestAction)
}

// Wait for chain to init and make it's first block before setting manifest
const waitForBlockToDispatch = (chainInterface, action) => {
  let unsubscribe = () => {}
  let count = 0
  unsubscribe = chainInterface.subscribe(() => {
    if (count === 0) {
      chainInterface.dispatch(action)
      unsubscribe()
      count += 1
    }
  })
}

module.exports = setRootChainManifest
