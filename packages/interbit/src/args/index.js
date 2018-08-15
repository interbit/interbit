// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { getArg, getArgs, isArg } = require('./getArg')
const argOptions = require('./argOptions')
const getArtifactsLocation = require('./getArtifactsLocation')
const { getConfig, getConfigLocation } = require('./getConfig')
const getConnect = require('./getConnect')
const getPort = require('./getPort')
const { getKeyPair } = require('./getKeyPair')
const getManifest = require('./getManifest')

module.exports = {
  argOptions,
  getArg,
  getArgs,
  getArtifactsLocation,
  getConfig,
  getConfigLocation,
  getConnect,
  getKeyPair,
  getManifest,
  getPort,
  isArg
}
