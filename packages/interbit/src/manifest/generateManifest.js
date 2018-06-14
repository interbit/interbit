const path = require('path')
const { getApps } = require('../config/configSelectors')
const hashObject = require('./hash')
const {
  resolveGenesisBlocks,
  resolveChainIdsFromGenesis
} = require('../genesisBlock')

const { createManifestTree } = require('./createManifestTree')

const generateManifest = (
  location,
  interbitConfig,
  covenants,
  originalManifest
) => {
  console.log('GENERATING A MANIFEST')
  console.log({ location, interbitConfig, covenants, originalManifest })
  const genesisBlocks = resolveGenesisBlocks(
    interbitConfig,
    originalManifest,
    covenants
  )
  const chains = resolveChainIdsFromGenesis(genesisBlocks)
  const apps = generateAppsManifest(location, interbitConfig)

  const manifestTemplate = {
    peers: interbitConfig.peers,
    apps,
    covenants,
    chains,
    genesisBlocks
  }

  const manifestTree = createManifestTree(interbitConfig, manifestTemplate)

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
