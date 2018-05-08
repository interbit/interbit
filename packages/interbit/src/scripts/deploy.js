const startInterbit = require('../chainManagement/startInterbit')
const { createChainsFromManifest } = require('../chainManagement/createChains')
const configureChains = require('../chainManagement/configureChains')

const deploy = async options => {
  const { keyPair, port, location, manifest } = options

  const { cli } = await startInterbit(keyPair, { port })
  // TODO: Refactor deployCovenants to its own function and move options up into here
  // Rename connect to configure and invert it so it makes more sense. ATM this is backwards
  // compatible with other uses of deploy throughout the code (Issue #39)
  await createChainsFromManifest(location, cli, manifest, options)

  if (!options.connect) {
    await configureChains(cli, manifest, options)
  }

  // TODO: Once deployed, watch the root chain for manifest updates and reconfigure #267

  return cli
}

module.exports = deploy
