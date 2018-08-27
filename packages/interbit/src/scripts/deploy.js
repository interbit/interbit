const {
  startInterbit,
  createChains: { createChainsFromManifest },
  setRootChainManifest
} = require('../chainManagement')

const deploy = async options => {
  const { keyPair, location, manifest } = options

  if (!location) {
    throw new Error('location option is required for interbit deploy.')
  }

  const { cli, hypervisor, cleanup } = await startInterbit(keyPair, options)

  await createChainsFromManifest(location, cli, manifest, options)

  await setRootChainManifest(cli, manifest)

  return { cli, hypervisor, cleanup }
}

module.exports = deploy
