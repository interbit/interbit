const path = require('path')
const interbit = require('interbit-core')
const {
  getApps,
  getChains,
  getChainCovenant,
  getChainJoins,
  getChainValidators,
  getAdminValidators
} = require('../config/configSelectors')

const { ROOT_CHAIN_ALIAS } = require('../chainManagement/constants')

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
  const chains = resolveChainIds(genesisBlocks)
  const apps = generateAppsManifest(location, interbitConfig)

  const manifestTemplate = {
    peers: interbitConfig.peers,
    apps,
    covenants,
    chains,
    genesisBlocks
  }

  const manifestTree = createManifestTree(
    interbitConfig,
    genesisBlocks,
    manifestTemplate
  )

  return {
    ...manifestTemplate,
    manifest: manifestTree
  }
}

const createManifestTree = (interbitConfig, genesisBlocks, manifest) => {
  // TODO: Form this in a tree structure instead of a flat structure... #336
  // gather all chains with no parent and make them children of the root chain
  // for each child gather children and add a write join to them from their parent chain that allows /*SET_MANIFEST/

  const branches = attachConfigToTree(interbitConfig)
  const root = {
    chainId: getChainIdFromGenesisBlock(genesisBlocks[ROOT_CHAIN_ALIAS]),
    validators: getAdminValidators(interbitConfig),
    covenants: {}, // all of the covenants
    chains: {
      ...branches
    }
  }

  return {
    [ROOT_CHAIN_ALIAS]: root
  }
}

const attachConfigToTree = (interbitConfig, manifest, tree) => {
  const nextTree = { ...tree }
  // TODO: Form this in a tree structure instead of a flat structure #336
  // if node has no children attach config and return it
  // if node has a child with no config call this function on it
  // if a node has children and they all have config merge that returned config and attach it to this node, then return the config

  const chainsConfig = getChains(interbitConfig)
  Object.entries(chainsConfig).forEach(([chainAlias, chainConfig]) => {
    nextTree[chainAlias] = {
      joins: getChainJoins(chainAlias, interbitConfig),
      covenant: getChainCovenant(chainAlias, interbitConfig)
    }
  })

  return nextTree
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

const resolveGenesisBlocks = (config, originalManifest, covenants) => {
  const chainsConfig = getChains(config)
  const resolvedChainAliases = originalManifest
    ? Object.keys(originalManifest.chains)
    : []
  const unresolvedChainConfigs = Object.entries(chainsConfig).filter(
    ([chainAlias]) => resolvedChainAliases.indexOf(chainAlias) === -1
  )

  if (!unresolvedChainConfigs) {
    return originalManifest.genesisBlocks
  }

  const newlyResolvedChains = resolveChains(
    unresolvedChainConfigs,
    covenants,
    config
  )

  if (resolvedChainAliases.indexOf(ROOT_CHAIN_ALIAS) === -1) {
    const rootGenesisBlock = createGenesisBlock(ROOT_CHAIN_ALIAS, config)
    newlyResolvedChains[ROOT_CHAIN_ALIAS] = rootGenesisBlock
  }

  return mergeResolutions(config, originalManifest, newlyResolvedChains)
}

const resolveChains = (unresolvedChains, covenants, config) =>
  unresolvedChains.reduce((prev, [chainAlias, chainConfig]) => {
    const genesisBlock = createGenesisBlock(chainAlias, config)
    return {
      ...prev,
      [chainAlias]: genesisBlock
    }
  }, {})

const resolveChainIds = genesisBlocks =>
  Object.entries(genesisBlocks).reduce(
    (prev, [chainAlias, genesisBlock]) => ({
      ...prev,
      [chainAlias]: getChainIdFromGenesisBlock(genesisBlock)
    }),
    {}
  )

const mergeResolutions = (config, originalManifest, newlyResolvedChains) => {
  if (!originalManifest) {
    return newlyResolvedChains
  }

  const configuredChains = Object.keys(getChains(config)).concat(
    ROOT_CHAIN_ALIAS
  )
  const resolvedChains = configuredChains.reduce(
    (prev, configuredChainAlias) => {
      // if the chain is configured include it
      const configuredGenesisBlock =
        originalManifest.genesisBlocks[configuredChainAlias]
      if (configuredGenesisBlock) {
        return {
          ...prev,
          [configuredChainAlias]: configuredGenesisBlock
        }
      }
      return prev
    },
    {}
  )

  return {
    ...newlyResolvedChains,
    ...resolvedChains
  }
}

const createGenesisBlock = (chainAlias, config) => {
  console.log(`BUILDING GENESIS FOR ${chainAlias}`)

  const validators =
    chainAlias === ROOT_CHAIN_ALIAS
      ? getAdminValidators(config)
      : getChainValidators(chainAlias, config)

  if (!validators.length) {
    throw new Error(
      `interbit build: Error building manifest. No validators specified for "${chainAlias}" chain`
    )
  }
  const blockMaster = validators[0]
  let configBuilder = interbit
    .genesisConfigBuilder()
    .setBlockMaster({ blockMaster })

  validators.forEach(validator => {
    if (validator !== blockMaster) {
      configBuilder = configBuilder.addRootKey({ rootKey: validator })
    }
  })

  // NOTE: We cannot add joins here because they are a two way operation and both
  // side requires the other's chain ID to resolve its join. This means that the
  // genesis block for the other has to have been created but it can't have been
  // created unless the other side has resolved its genesis block which means...
  // ... deploy will have to do the the joining

  // NOTE: Might not be the right idea to include covenant hash in here per #258 #218 #267
  // ... try it and see if it messes with the chain IDs and it's better to apply the
  // covenants in the watcher
  const builtConfig = configBuilder.build()
  console.log(builtConfig)
  return interbit.createGenesisBlock({ config: builtConfig })
}

const getChainIdFromGenesisBlock = genesisBlock => genesisBlock.blockHash

module.exports = {
  generateManifest,
  resolveGenesisBlocks
}
