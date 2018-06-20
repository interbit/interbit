const interbit = require('interbit-core')

const {
  config: {
    selectors: { getChains, getChainValidators, getAdminValidators }
  },
  constants: { ROOT_CHAIN_ALIAS }
} = require('interbit-covenant-tools')
const { getChainId } = require('./genesisBlockSelectors')

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

  if (!resolvedChainAliases.find(alias => alias === ROOT_CHAIN_ALIAS)) {
    const rootGenesisBlock = createGenesisBlock(ROOT_CHAIN_ALIAS, config)
    newlyResolvedChains[ROOT_CHAIN_ALIAS] = rootGenesisBlock
  }

  return mergeResolutions(config, originalManifest, newlyResolvedChains)
}

const resolveChainIds = genesisBlocks =>
  Object.entries(genesisBlocks).reduce(
    (prev, [chainAlias, genesisBlock]) => ({
      ...prev,
      [chainAlias]: getChainId(genesisBlock)
    }),
    {}
  )

const resolveChains = (unresolvedChains, covenants, config) =>
  unresolvedChains.reduce((prev, [chainAlias, chainConfig]) => {
    const genesisBlock = createGenesisBlock(chainAlias, config)
    return {
      ...prev,
      [chainAlias]: genesisBlock
    }
  }, {})

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

  validators
    .filter(validator => validator !== blockMaster)
    .forEach(validator => {
      configBuilder = configBuilder.addRootKey({ rootKey: validator })
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
  return interbit.createGenesisBlock({ config: builtConfig })
}

module.exports = {
  resolveGenesisBlocks,
  resolveChainIds
}
