const path = require('path')
const {
  config: {
    selectors: { getApps },
    validateConfig
  }
} = require('interbit-covenant-tools')
const hashObject = require('./hash')
const {
  resolveGenesisBlocks,
  resolveChainIdsFromGenesis
} = require('../genesisBlock')
const log = require('../log')
const { createManifestTree } = require('./createManifestTree')

/**
 * Generates a manifest file based on the configuration and optional original
 * manifest passed into parameters, resolving config specifications to chain Ids,
 * covenant hashes, and genesis blocks.
 * @param {String} location - The file location to work from, commonly `process.cwd()`.
 * @param {Obejct} interbitConfig - The Interbit configuration file as JSON.
 * @param {Object} covenants - A map of covenant aliases to their hashes.
 * @param {[originalManifest]} manifest - The Interbit manifest file as JSON, if available.
 * @returns {Object} - The newly generated Interbit manifest.
 */
const generateManifest = (
  location,
  interbitConfig,
  covenants,
  originalManifest
) => {
  log.info('GENERATING A MANIFEST')
  log.info({ location, interbitConfig, covenants, originalManifest })
  const config = validateConfig(interbitConfig)

  const genesisBlocks = resolveGenesisBlocks(
    config,
    originalManifest,
    covenants
  )
  const chains = resolveChainIdsFromGenesis(genesisBlocks)
  const apps = generateAppsManifest(location, config)

  const manifestTemplate = {
    peers: config.peers,
    apps,
    covenants,
    chains,
    genesisBlocks
  }

  const manifestTree = createManifestTree(config, manifestTemplate)

  const manifest = {
    ...manifestTemplate,
    manifest: manifestTree
  }

  const hash = hashObject(manifest)

  return {
    ...manifest,
    hash
  }
}

const generateAppsManifest = (location, interbitConfig) => {
  const configApps = getApps(interbitConfig)
  const apps = Object.keys(configApps).reduce(
    (prev, appAlias) => ({
      ...prev,
      [appAlias]: {
        appChain: configApps[appAlias].appChain,
        // TODO: Update this build location with implementation of #9
        buildLocation: path.relative(
          location,
          configApps[appAlias].buildLocation
        ),
        browserChains: configApps[appAlias].chains
      }
    }),
    {}
  )

  return apps
}

module.exports = {
  generateManifest
}
