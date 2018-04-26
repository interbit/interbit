const { ROOT_CHAIN_ALIAS } = require('../chainManagement/constants')
const _ = require('lodash')

const getApps = manifest => manifest.apps
const getChains = manifest => manifest.chains
const getCovenants = manifest => manifest.covenants
const getGenesisBlocks = manifest => manifest.genesisBlocks
const getManifest = manifest => manifest.manifest
const getPeers = manifest => manifest.peers

const getChainIdByAlias = (chainAlias, manifest) =>
  _.get(manifest, ['chains', chainAlias])

const getCovenantHashByAlias = (chainAlias, manifest) => {
  // TODO: Expand to get root covenant + walk the manifest tree when
  // cascading deployment arrives
  const covenantAlias = _.get(getRootChildren(manifest), [
    chainAlias,
    'covenant'
  ])
  return _.get(getCovenants(manifest), [covenantAlias, 'hash'])
}

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

module.exports = {
  getApps,
  getChains,
  getCovenants,
  getGenesisBlocks,
  getPeers,
  getBlockMasterByAlias,
  getChainIdByAlias,
  getCovenantHashByAlias,
  getGenesisBlockByAlias,
  getRootChildren
}
