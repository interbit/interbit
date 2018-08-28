const { ROOT_CHAIN_ALIAS } = require('../constants')
const _ = require('lodash')

const getApps = manifest => manifest.apps
const getChains = manifest => manifest.chains
const getCovenants = manifest => manifest.covenants
const getGenesisBlocks = manifest => manifest.genesisBlocks
const getManifest = manifest => manifest.manifest
const getPeers = manifest => manifest.peers

const getChainAliases = manifest => Object.keys(getChains(manifest))
const getChainIds = manifest => Object.values(getChains(manifest))

const getChainIdByAlias = (chainAlias, manifest) =>
  _.get(manifest, ['chains', chainAlias])
const getRootChainId = manifest => getChainIdByAlias(ROOT_CHAIN_ALIAS, manifest)

const getCovenantHashByAlias = (chainAlias, manifest) => {
  const covenantAlias = _.get(getChildChainByAlias(chainAlias, manifest), [
    'covenant'
  ])
  return _.get(getCovenants(manifest), [covenantAlias, 'hash'])
}

const getJoinsByAlias = (chainAlias, manifest) =>
  _.get(getChildChainByAlias(chainAlias, manifest), ['joins'])

const getGenesisBlockByAlias = (chainAlias, manifest) =>
  _.get(manifest, ['genesisBlocks', chainAlias])

const getBlockMasterByAlias = (chainAlias, manifest) =>
  _.get(manifest, [
    'genesisBlocks',
    chainAlias,
    'content',
    'state',
    'interbit',
    'config',
    'blockMaster'
  ])

const getRootChildren = manifest => {
  const manifestTree = getManifest(manifest)
  if (!manifestTree[ROOT_CHAIN_ALIAS]) {
    return undefined
  }
  return manifestTree[ROOT_CHAIN_ALIAS].chains
}

const getChildChainByAlias = (chainAlias, manifest) => {
  const manifestTree = getManifest(manifest)
  const rootTree = manifestTree[ROOT_CHAIN_ALIAS]
  if (chainAlias === ROOT_CHAIN_ALIAS) {
    return rootTree
  }

  return findAliasInSubtree(chainAlias, rootTree)
}

const findAliasInSubtree = (chainAlias, subtree) => {
  const children = subtree.chains
  if (!children) {
    return undefined
  }

  for (const childChainAlias of Object.keys(children)) {
    if (childChainAlias === chainAlias) {
      return subtree.chains[chainAlias]
    }

    const childChain = subtree.chains[childChainAlias]
    if (childChain.chains) {
      for (const grandChildChain of Object.values(childChain.chains)) {
        const found = findAliasInSubtree(chainAlias, grandChildChain)
        if (found) {
          return found
        }
      }
    }
  }
  return undefined
}

module.exports = {
  findAliasInSubtree,
  getApps,
  getBlockMasterByAlias,
  getChainAliases,
  getChainIdByAlias,
  getChainIds,
  getChains,
  getChildChainByAlias,
  getCovenantHashByAlias,
  getCovenants,
  getGenesisBlockByAlias,
  getGenesisBlocks,
  getJoinsByAlias,
  getManifest,
  getPeers,
  getRootChainId,
  getRootChildren
}
