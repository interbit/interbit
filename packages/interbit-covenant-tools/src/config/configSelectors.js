const getApps = config => config.apps
const getAdminValidators = config => config.adminValidators || []
const getChains = config => config.staticChains
const getCovenants = config => config.covenants
const getPeers = config => config.peers

const getChainByAlias = (chainAlias, config) => {
  const chainsConfig = getChains(config)
  if (!chainsConfig) {
    return undefined
  }

  return chainsConfig[chainAlias]
}

const getChainValidators = (chainAlias, config) => {
  const chainConfig = getChainByAlias(chainAlias, config)
  if (!chainConfig || !chainConfig.config || !chainConfig.config.validators) {
    return []
  }
  return chainConfig.config.validators
}

const getChainJoins = (chainAlias, config) => {
  const chainConfig = getChainByAlias(chainAlias, config)
  if (!chainConfig || !chainConfig.config || !chainConfig.config.joins) {
    return undefined
  }
  return chainConfig.config.joins
}

const getChainCovenant = (chainAlias, config) => {
  const chainConfig = getChainByAlias(chainAlias, config)
  if (!chainConfig) {
    return undefined
  }
  return chainConfig.covenant
}

const getJoinTypeForChain = (chainAlias, joinType, config) => {
  const joinConfig = getChainJoins(chainAlias, config)
  return joinConfig[joinType] ? joinConfig[joinType] : []
}

const getParentByChainAlias = (chainAlias, config) => {
  const staticChainEntries = Object.entries(getChains(config))
  for (const [alias, chainConfig] of staticChainEntries) {
    const childChains = chainConfig.childChains || []
    if (childChains.find(child => child === chainAlias)) {
      return alias
    }
  }
  return undefined
}

module.exports = {
  getAdminValidators,
  getApps,
  getChains,
  getChainByAlias,
  getChainCovenant,
  getChainJoins,
  getChainValidators,
  getJoinTypeForChain,
  getCovenants,
  getParentByChainAlias,
  getPeers
}
