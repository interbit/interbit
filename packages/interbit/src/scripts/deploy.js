const startInterbit = require('../chainManagement/startInterbit')
const { createChainsFromManifest } = require('../chainManagement/createChains')
const configureChains = require('../chainManagement/configureChains')

const deploy = async options => {
  const { keyPair, port, location, manifest } = options

  const { cli } = await startInterbit(keyPair, { port })
  await createChainsFromManifest(location, cli, manifest)
  await configureChains(cli, manifest)

  // TODO: Once deployed, watch the root chain for manifest updates and reconfigure #267

  return cli
}

module.exports = deploy
