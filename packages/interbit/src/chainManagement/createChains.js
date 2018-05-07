const path = require('path')

const {
  getChains,
  getCovenants,
  getPeers
} = require('../config/configSelectors')
const {
  getGenesisBlocks,
  getCovenants: getCovenantsFromManifest,
  getPeers: getPeersFromManifest
} = require('../manifest/manifestSelectors')

const deployCovenants = require('./deployCovenants')
const connectToPeers = require('./connectToPeers')
const { joinChains } = require('./joinChains')

const createChainsFromManifest = async (location, cli, manifest, options) => {
  console.log('DEPLOYING COVENANTS')
  if (!options.connect) {
    const covenants = getCovenantsFromManifest(manifest)
    const covenantEntries = Object.values(covenants)
    for (const covenantManifest of covenantEntries) {
      const covenantLocation = path.resolve(
        `${location}/${covenantManifest.filename}`
      )
      await cli.deployCovenant(covenantLocation)
      console.log(`...deployed${covenantLocation}`)
    }
  }

  const peers = getPeersFromManifest(manifest)
  await connectToPeers(cli, peers)

  const genesisBlocks = getGenesisBlocks(manifest)
  const genesisBlockEntries = Object.values(genesisBlocks)
  for (const genesisBlock of genesisBlockEntries) {
    const chainId = await cli.startChain({ genesisBlock })
    console.log(`Created chain ${chainId}`)
    // The covenant will apply itself due to its presence in the genesis block

    const chain = cli.getChain(chainId)
    chain.dispatch({ type: '@@interbit/DEPLOY' })
  }
}

// SET FOR DEPRECATION: Pending issue #79
const createChainsFromConfig = async (cli, interbitConfig) => {
  console.log('BOOTING CHAINS')

  const chainsConfig = getChains(interbitConfig)

  const chainManifest = {}

  const covenantHashes = await deployCovenants({
    cli,
    covenantConfig: getCovenants(interbitConfig)
  })

  await connectToPeers(cli, getPeers(interbitConfig))

  // TODO: Make a root chain (this is the devMode createChains func) #276

  try {
    const chainAliases = Object.keys(chainsConfig)
    for (const chainAlias of chainAliases) {
      const chainConfig = chainsConfig[chainAlias]

      chainManifest[chainAlias] = {}

      const covenantHash = covenantHashes[chainConfig.covenant]
      const chainId = await cli.createChain()

      console.log('CREATING CHAIN: ', {
        chainAlias,
        covenantHash,
        chainId
      })
      await cli.applyCovenant(chainId, covenantHash)

      const chain = cli.getChain(chainId)
      chain.dispatch({ type: '@@interbit/START' })

      // add to manifest
      chainManifest[chainAlias] = {
        covenantHash,
        chainId
      }
    }

    console.log('BOOTING COMPLETE')

    await joinChains(chainManifest, cli, interbitConfig)

    return { chainManifest, covenantHashes }
  } catch (err) {
    console.error('CREATE CHAINS FAILURE:', err)
    throw err
  }
}

module.exports = { createChainsFromConfig, createChainsFromManifest }
