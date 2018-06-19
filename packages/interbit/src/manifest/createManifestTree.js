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
    }
  },
  constants: { ROOT_CHAIN_ALIAS }
} = require('interbit-covenant-tools')

const {
  genesisBlockSelectors: { getChainId }
} = require('../genesisBlock')

const createManifestTree = (config, manifest) => {
  const { genesisBlocks } = manifest
  const chainId = getChainId(genesisBlocks[ROOT_CHAIN_ALIAS])
  const validators = getAdminValidators(config) // I suspect this should not be getting the admin validators but the ones for the chain, specifically
  const chains = getRootSubtrees(ROOT_CHAIN_ALIAS, config, manifest)
  const covenant = ROOT_CHAIN_ALIAS
  const covenants = getSubtreeCovenants(ROOT_CHAIN_ALIAS, covenant, chains)

  const joins = configureCascadingJoins(undefined, Object.keys(chains), {})

  const manifestEntry = {
    chainId,
    validators,
    covenant,
    covenants,
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

const getRootSubtrees = (chainAlias, config, manifest) => {
  const staticChainEntries = Object.entries(config.staticChains)
  const allChildren = staticChainEntries.reduce((accum, [, v]) => {
    if (Array.isArray(v.childChains)) {
      return accum.concat(v.childChains)
    }
    return accum
  }, [])

  const visited = []
  const subtrees = staticChainEntries.reduce((accum, [childAlias]) => {
    if (allChildren.indexOf(childAlias) > -1) {
      return accum
    }
    return {
      ...accum,
      [childAlias]: getManifestEntry(childAlias, config, manifest, visited)
    }
  }, {})

  if (_.isEmpty(subtrees)) {
    throw new Error(
      'Config contains malformed childChains structure. ChildChains must form one or many trees when constructed.'
    )
  }

  return subtrees
}

const getManifestEntry = (chainAlias, config, manifest, visited) => {
  const chainConfig = config.staticChains[chainAlias]
  if (!chainConfig) {
    return {}
  }

  if (visited.indexOf(chainAlias) > -1) {
    throw new Error(
      `Config contains malformed childChains structure and must form one or many trees. "${chainAlias}" was referenced twice.`
    )
  }

  const nowVisited = visited.concat(chainAlias)

  const existingJoins = getChainJoins(chainAlias, config)
  const chains = getChainsChildren(chainAlias, config, manifest, nowVisited)
  const covenant = getChainCovenant(chainAlias, config)
  const covenants = getSubtreeCovenants(chainAlias, covenant, chains)

  const childAliases = Object.keys(chains) || []
  const parentAlias =
    getParentByChainAlias(chainAlias, config) || ROOT_CHAIN_ALIAS
  const joins = configureCascadingJoins(
    parentAlias,
    childAliases,
    existingJoins
  )

  const manifestEntry = {
    chainId: getChainId(manifest.genesisBlocks[chainAlias]),
    validators: getAdminValidators(config),
    covenant,
    covenants,
    joins,
    chains
  }

  const hash = hashObject(manifestEntry)

  return {
    ...manifestEntry,
    hash
  }
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

const configureCascadingJoins = (
  parentAlias,
  childAliases = [],
  existingJoins
) => {
  const childJoins = childAliases.map(childAlias => ({
    alias: childAlias
  }))
  const parentJoin = parentAlias
    ? {
        alias: parentAlias,
        authorizedActions: [actionTypes.SET_MANIFEST]
      }
    : []

  const existingSend = existingJoins.sendActionTo || []
  const existingReceive = existingJoins.receiveActionFrom || []

  return {
    ...existingJoins,
    sendActionTo: existingSend.concat(childJoins),
    receiveActionFrom: existingReceive.concat(parentJoin)
  }
}

const getChainsChildren = (chainAlias, config, manifest, visited) => {
  const chainConfig = config.staticChains[chainAlias]
  if (!chainConfig) {
    return {}
  }

  const childAliases = chainConfig.childChains
  if (!Array.isArray(childAliases) || childAliases.length === 0) {
    return {}
  }

  return childAliases.reduce(
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
