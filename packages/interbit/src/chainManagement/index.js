const configureChains = require('./configureChains')
const createChains = require('./createChains')
const generateDeploymentDetails = require('./generateDeploymentDetails')
const startInterbit = require('./startInterbit')
const setRootChainManifest = require('./setRootChainManifest')
const watchChain = require('./watchChain')
const deployCovenants = require('./deployCovenants')

module.exports = {
  configureChains,
  createChains,
  generateDeploymentDetails,
  startInterbit,
  setRootChainManifest,
  watchChain,
  deployCovenants
}
