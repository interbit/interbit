const path = require('path')
const fs = require('fs-extra')

const log = require('../log')
const { getArg } = require('./getArg')
const { CONFIG } = require('./argOptions')

const getConfigLocation = () => {
  const configArg = getArg(process.argv, CONFIG)
  const configLocation = configArg
    ? path.resolve(configArg)
    : `${process.cwd()}/interbit.config.js`

  return configLocation
}

/**
 * Gets the Interbit configuration file from disk based on the `--config`
 * option passed through process args.
 * @returns {Object|undefined} The configuration file, if found, as a JSON object.
 */
const getConfig = () => {
  const configLocation = getConfigLocation()

  const doesConfigExist = fs.existsSync(configLocation)
  if (!doesConfigExist) {
    return undefined
  }

  log.info(`Loading config at ${configLocation}`)

  // eslint-disable-next-line
  const interbitConfig = require(configLocation)

  return interbitConfig
}

module.exports = {
  getConfig,
  getConfigLocation
}
