const {
  startInterbit,
  createChains: { createChainsFromManifest },
  configureChains
} = require('../chainManagement')

const deploy = async options => {
  const { keyPair, port, location, manifest, connect } = options

  if (!location) {
    throw new Error('location option is required for interbit deploy.')
  }

  const { cli, hypervisor } = await startInterbit(keyPair, { port })

  // TODO: Refactor deployCovenants to its own function and move options up into here
  // Rename connect to configure and invert it so it makes more sense. ATM this is backwards
  // compatible with other uses of deploy throughout the code

  await createChainsFromManifest(location, cli, manifest, options)

  if (!connect) {
    await configureChains(cli, manifest, options)
  }

  // TODO: Once deployed, watch the root chain for manifest updates and reconfigure #267

  return { cli, hypervisor }
}

module.exports = deploy
