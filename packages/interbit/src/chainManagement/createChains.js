const path = require('path')

const {
  config: {
    selectors: { getChains, getCovenants, getPeers }
  },
  manifest: {
    selectors: {
      getGenesisBlocks,
      getCovenants: getCovenantsFromManifest,
      getPeers: getPeersFromManifest
    }
  }
} = require('interbit-covenant-tools')

const log = require('../log')
const deployCovenants = require('./deployCovenants')
const connectToPeers = require('./connectToPeers')
const { joinChains } = require('./joinChains')

/**
 * Uses a manifest to create chains from genesis blocks and configures the
 * cli with peers and covenants from the manifest.
 * @param {string} location - The file location to work from.
 * @param {Object} cli - The Interbit cli to configure and create chains on.
 * @param {Object} manifest - The Interbit manifest with config options.
 * @param {Object} options - Additional options for configuration.
 */
const createChainsFromManifest = async (location, cli, manifest, options) => {
  log.info('DEPLOYING COVENANTS')
  if (!options.connect) {
    const covenants = getCovenantsFromManifest(manifest)
    const covenantEntries = Object.values(covenants)
    for (const covenantManifest of covenantEntries) {
      const covenantLocation = path.resolve(
        `${location}/${covenantManifest.filename}`
      )
      await cli.deployCovenant(covenantLocation)
      log.info(`...deployed${covenantLocation}`)
    }
  }

  const peers = getPeersFromManifest(manifest)
  await connectToPeers(cli, peers)

  const genesisBlocks = getGenesisBlocks(manifest)
  const genesisBlockEntries = Object.values(genesisBlocks)
  for (const genesisBlock of genesisBlockEntries) {
    const chainId = genesisBlock.blockHash
    try {
      await cli.loadChain(chainId)
      log.info(`Loaded chain ${chainId}`)
    } catch (e) {
      if (e.message.startsWith('waitForState timeout after waiting 20000 ms')) {
        await cli.startChain({ genesisBlock })
        log.info(`Created chain ${chainId}`)

        const chain = cli.getChain(chainId)
        chain.dispatch({ type: '@@interbit/DEPLOY' })
      } else {
        throw e
      }
    }
  }

  log.success('Chains were created from manifest')
}

// SET FOR DEPRECATION: Pending issue #79
/**
 * Uses a config to create chains without genesis blocks or keys, and configures the
 * cli with peers and covenants from the manifest.
 * @deprecated
 * @param {Object} cli - The cli of the node to configure.
 * @param {Object} interbitConfig - The Interbit configuration to use.
 */
const createChainsFromConfig = async (cli, interbitConfig) => {
  log.info('BOOTING CHAINS')

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

      log.info('CREATING CHAIN: ', {
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

    log.info('BOOTING COMPLETE')
    await joinChains(chainManifest, cli, interbitConfig)
    log.success('Chains were created from config')

    return { chainManifest, covenantHashes }
  } catch (err) {
    log.error('CREATE CHAINS FAILURE:', err)
    throw err
  }
}

module.exports = { createChainsFromConfig, createChainsFromManifest }
