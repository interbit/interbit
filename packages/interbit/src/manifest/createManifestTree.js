const _ = require('lodash')
const hashObject = require('./hash')
const {
  rootCovenant: { actionTypes },
  config: {
    selectors: {
      getAdminValidators,
      getChainCovenant,
      getChainJoins,
      getParentByChainAlias
    },
    validateConfig
  },
  constants: { ROOT_CHAIN_ALIAS }
} = require('interbit-covenant-tools')

const {
  genesisBlockSelectors: { getChainId }
} = require('../genesisBlock')

const createManifestTree = (interbitConfig, manifest) => {
  const config = validateConfig(interbitConfig)

  const { genesisBlocks } = manifest
  const chainId = getChainId(genesisBlocks[ROOT_CHAIN_ALIAS])
  const validators = getAdminValidators(config)
  const chains = getRootSubtrees(ROOT_CHAIN_ALIAS, config, manifest)
  const covenant = ROOT_CHAIN_ALIAS
  const covenantHashMap = getSubtreeCovenants(
    ROOT_CHAIN_ALIAS,
    covenant,
    chains
  )

  const joins = configureCascadingJoins(
    undefined,
    Object.keys(chains),
    minimumJoinconfig
  )

  const chainIdMap = mergeJoinAndChildChainIds(joins, chains, manifest)

  const manifestEntry = {
    alias: ROOT_CHAIN_ALIAS,
    chainId,
    chainIdMap,
    validators,
    covenant,
    covenantHashMap,
    joins,
    chains
  }
  const hash = hashObject(manifestEntry)

  return {
    [ROOT_CHAIN_ALIAS]: {
      ...manifestEntry,
      hash
    }
  }
}

const minimumJoinconfig = {
  consume: [],
  provide: [],
  receiveActionFrom: [],
  sendActionTo: []
}

const getRootSubtrees = (chainAlias, config, manifest) => {
  const staticChainEntries = Object.entries(config.staticChains)
  const allChildChains = staticChainEntries.reduce(
    (accum, [, chainConfig]) => accum.concat(chainConfig.childChains),
    []
  )

  const visited = []
  const subtrees = staticChainEntries.reduce((accum, [childAlias]) => {
    const isChainSubtreeRoot = !allChildChains.find(
      childChain => childChain === childAlias
    )
    if (isChainSubtreeRoot) {
      return {
        ...accum,
        [childAlias]: getManifestEntry(childAlias, config, manifest, visited)
      }
    }
    return accum
  }, {})

  if (_.isEmpty(subtrees)) {
    throw new Error(
      'Config contains malformed childChains structure. ChildChains must form one or many trees when constructed.'
    )
  }

  return subtrees
}

const getManifestEntry = (chainAlias, config, manifest, visited) => {
  const nowVisited = checkForCycles(chainAlias, visited)

  const parentAlias =
    getParentByChainAlias(chainAlias, config) || ROOT_CHAIN_ALIAS
  const childChains = getChainsChildren(
    chainAlias,
    config,
    manifest,
    nowVisited
  )

  const covenant = getChainCovenant(chainAlias, config)
  const covenantHashMap = getSubtreeCovenants(chainAlias, covenant, childChains)

  const existingJoins = getChainJoins(chainAlias, config)
  const joins = configureCascadingJoins(
    parentAlias,
    Object.keys(childChains),
    existingJoins
  )

  const chainIdMap = mergeJoinAndChildChainIds(joins, childChains, manifest)

  const manifestEntry = {
    alias: chainAlias,
    chainId: getChainId(manifest.genesisBlocks[chainAlias]),
    chainIdMap,
    validators: getAdminValidators(config),
    covenant,
    covenantHashMap,
    joins,
    chains: childChains
  }

  const hash = hashObject(manifestEntry)

  return {
    ...manifestEntry,
    hash
  }
}

const mergeJoinAndChildChainIds = (joins, childChains, manifest) => {
  const joinChainIds = Object.values(joins).reduce((accum, joinsOfType) => {
    const joinedChainIds = joinsOfType.reduce(
      (accumJoin, join) => ({
        ...accumJoin,
        [join.alias]: manifest.chains[join.alias]
      }),
      {}
    )

    return {
      ...accum,
      ...joinedChainIds
    }
  }, {})

  const childChainIds = Object.values(childChains).reduce(
    (accum, childChainEntry) => ({
      ...accum,
      [childChainEntry.alias]: manifest.chains[childChainEntry.alias]
    }),
    {}
  )

  return {
    ...childChainIds,
    ...joinChainIds
  }
}

const checkForCycles = (chainAlias, visited) => {
  if (visited.find(node => node === chainAlias)) {
    throw new Error(
      `Config contains malformed childChains structure and must form one or many trees. "${chainAlias}" was referenced twice.`
    )
  }

  return visited.concat(chainAlias)
}

const getSubtreeCovenants = (chainAlias, myCovenant, chains) => ({
  [chainAlias]: myCovenant,
  ...Object.values(chains).reduce(
    (accum, chain) => ({
      ...chain.covenants
    }),
    {}
  )
})

const configureCascadingJoins = (parentAlias, childAliases, existingJoins) => {
  const parentJoin = parentAlias
    ? {
        alias: parentAlias,
        authorizedActions: [actionTypes.SET_MANIFEST]
      }
    : []
  const childJoins = childAliases.map(childAlias => ({
    alias: childAlias
  }))

  return {
    ...existingJoins,
    sendActionTo: existingJoins.sendActionTo.concat(childJoins),
    receiveActionFrom: existingJoins.receiveActionFrom.concat(parentJoin)
  }
}

const getChainsChildren = (chainAlias, config, manifest, visited) => {
  const chainConfig = config.staticChains[chainAlias]

  return chainConfig.childChains.reduce(
    (accum, childAlias) => ({
      ...accum,
      [childAlias]: getManifestEntry(childAlias, config, manifest, visited)
    }),
    {}
  )
}

module.exports = {
  createManifestTree
}
