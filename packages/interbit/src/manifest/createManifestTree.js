const _ = require('lodash')
const {
  getChainCovenant,
  getChainJoins,
  getAdminValidators
} = require('../config/configSelectors')
const {
  genesisBlockSelectors: { getChainId }
} = require('../genesisBlock')
const { ROOT_CHAIN_ALIAS } = require('../chainManagement/constants')

const createManifestTree = (config, manifest) => {
  const { genesisBlocks } = manifest
  const chainId = getChainId(genesisBlocks[ROOT_CHAIN_ALIAS])
  const validators = getAdminValidators(config) // I suspect this should not be getting the admin validators but the ones for the chain, specifically
  const chains = getChildren(ROOT_CHAIN_ALIAS, config, manifest)
  const covenants = getSubtreeCovenants(
    ROOT_CHAIN_ALIAS,
    'rootCovenant', // TODO: Always deploy the root covenant and know what it is
    chains
  )

  return {
    [ROOT_CHAIN_ALIAS]: {
      chainId,
      validators,
      covenants,
      chains
    }
  }
}

const getChildren = (chainAlias, config, manifest) => {
  const staticChainEntries = Object.entries(config.staticChains)
  const allChildren = staticChainEntries.reduce((accum, [, v]) => {
    if (Array.isArray(v.childChains)) {
      return accum.concat(v.childChains)
    }
    return accum
  }, [])

  const visited = []
  const subtrees = staticChainEntries.reduce((accum, [k]) => {
    if (allChildren.indexOf(k) > -1) {
      return accum
    }
    return {
      ...accum,
      [k]: getManifestEntry(k, config, manifest, visited)
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

  const joins = getChainJoins(chainAlias, config)
  const chains = getChainsChildren(chainAlias, config, manifest, nowVisited)
  const covenants = getSubtreeCovenants(
    chainAlias,
    getChainCovenant(chainAlias, config),
    chains
  )

  return {
    chainId: getChainId(manifest.genesisBlocks[chainAlias]),
    validators: getAdminValidators(config),
    covenants,
    joins,
    chains
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
