// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { getArg, getArgs, isArg } = require('./args/getArg')
const argOptions = require('./args/argOptions')
const getArtifactsLocation = require('./args/getArtifactsLocation')
const getConfig = require('./args/getConfig')
const getPort = require('./args/getPort')
const { getKeyPair } = require('./args/getKeyPair')
const getManifest = require('./args/getManifest')

const constants = require('./chainManagement/constants')
const createChains = require('./chainManagement/createChains')
const watchCovenants = require('./chainManagement/watchCovenants')
const generateDeploymentDetails = require('./chainManagement/generateDeploymentDetails')
const startInterbit = require('./chainManagement/startInterbit')
const setRootChainManifest = require('./chainManagement/setRootChainManifest')
const watchChain = require('./chainManagement/watchChain')

const buildManifest = require('./manifest/buildManifest')
const { generateManifest } = require('./manifest/generateManifest')
const manifestSelectors = require('./manifest/manifestSelectors')
const {
  updateIndexHtmls,
  updateDom,
  camelCaseToHyphenated
} = require('./chainManagement/updateIndexHtml')

const configSelectors = require('./config/configSelectors')
const validateConfig = require('./config/validateConfig')

const { hoistPackages, hoistAllCovenantPackages } = require('./hoist')
const logo = require('./logo')

module.exports = {
  argOptions,
  buildManifest,
  camelCaseToHyphenated,
  configSelectors,
  constants,
  createChains,
  generateDeploymentDetails,
  generateManifest,
  getArg,
  getArgs,
  getArtifactsLocation,
  getConfig,
  getKeyPair,
  getManifest,
  getPort,
  isArg,
  hoistPackages,
  hoistAllCovenantPackages,
  logo,
  manifestSelectors,
  startInterbit,
  setRootChainManifest,
  updateDom,
  updateIndexHtmls,
  validateConfig,
  watchChain,
  watchCovenants
}
