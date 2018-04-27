const path = require('path')
const fs = require('fs-extra')

const { getArg } = require('./getArg')
const { CONFIG } = require('./argOptions')

const getConfigLocation = () => {
  const configArg = getArg(process.argv, CONFIG)
  const configLocation = configArg
    ? path.resolve(configArg)
    : `${process.cwd()}/interbit.config.js`

  return configLocation
}

const getConfig = () => {
  const configLocation = getConfigLocation()

  const doesConfigExist = fs.existsSync(configLocation)
  if (!doesConfigExist) {
    console.error(`Config file does not exist at location ${configLocation}`)
    process.exit(1)
  }

  console.log(`Loading config at ${configLocation}`)

  // eslint-disable-next-line
  const interbitConfig = require(configLocation)

  return interbitConfig
}

module.exports = getConfig
