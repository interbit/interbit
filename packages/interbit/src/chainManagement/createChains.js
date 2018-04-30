const {
  getGenesisBlocks,
  getPeers: getPeersFromManifest
} = require('../manifest/manifestSelectors')
const deployCovenants = require('./deployCovenants')
const connectToPeers = require('./connectToPeers')

const createChainsFromManifest = async (location, cli, manifest, opts) => {
  console.log('DEPLOYING COVENANTS')

  const covenantHashes = await deployCovenants(location, cli, manifest, opts)

  const peers = getPeersFromManifest(manifest)
  await connectToPeers(cli, peers)

  const genesisBlocks = getGenesisBlocks(manifest)
  const genesisBlockEntries = Object.values(genesisBlocks)
  for (const genesisBlock of genesisBlockEntries) {
    const chainId = await cli.startChain({ genesisBlock })
    console.log(`Created chain ${chainId}`)

    const chain = cli.getChain(chainId)
    chain.dispatch({ type: '@@interbit/DEPLOY' })
  }

  return covenantHashes
}

module.exports = { createChainsFromManifest }
