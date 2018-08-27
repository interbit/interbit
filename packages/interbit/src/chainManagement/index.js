const configureChains = require('./configureChains')
const createChains = require('./createChains')
const destroyRemovedChains = require('./destroyRemovedChains')
const generateDeploymentDetails = require('./generateDeploymentDetails')
const initializeCovenants = require('./initializeCovenants')
const initializeJoins = require('./initializeJoins')
const startInterbit = require('./startInterbit')
const setRootChainManifest = require('./setRootChainManifest')
const watchChain = require('./watchChain')

module.exports = {
  configureChains,
  createChains,
  destroyRemovedChains,
  generateDeploymentDetails,
  initializeCovenants,
  initializeJoins,
  startInterbit,
  setRootChainManifest,
  watchChain
}
