const configureChains = require('./configureChains')
const createChains = require('./createChains')
const generateDeploymentDetails = require('./generateDeploymentDetails')
const initializeCovenants = require('./initializeCovenants')
const startInterbit = require('./startInterbit')
const setRootChainManifest = require('./setRootChainManifest')
const watchChain = require('./watchChain')

module.exports = {
  configureChains,
  createChains,
  generateDeploymentDetails,
  initializeCovenants,
  startInterbit,
  setRootChainManifest,
  watchChain
}
