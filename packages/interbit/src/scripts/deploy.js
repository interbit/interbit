const {
  startInterbit,
  createChains: { createChainsFromManifest },
  setRootChainManifest,
  initializeCovenants,
  destroyRemovedChains
} = require('../chainManagement')

/**
 * Deploys an Interbit node based on the provided options.
 * @param {Object} options - Deployment options
 * @param {Object} options.keyPair - The key pair to use for this node
 * @param {Object} options.keyPair.publicKey - The public key portion of this key pair
 * @param {Object} options.keyPair.privateKey - The private key portion of this key pair
 * @param {Object} options.location - The file location to run the deploy process from
 * @param {Object} options.manifest - The interbit manifest file used to configure this node
 * @param {Object} options.connect - Whether this node is connecting to other nodes for configuration or configuring itself
 */
const deploy = async options => {
  const { keyPair, location, manifest } = options

  if (!location) {
    throw new Error('location option is required for interbit deploy.')
  }

  const { cli, hypervisor, cleanup } = await startInterbit(keyPair, options)

  await createChainsFromManifest(location, cli, manifest, options)

  await initializeCovenants(cli, manifest, options)
  destroyRemovedChains(cli, manifest)

  await setRootChainManifest(cli, manifest)

  return { cli, hypervisor, cleanup }
}

module.exports = deploy
