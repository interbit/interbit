const path = require('path')

const { getArg } = require('./getArg')
const { ADMIN_KEYS } = require('./argOptions')

const getKeyPairLocation = () => {
  const adminKeysArg = getArg(process.argv, ADMIN_KEYS)
  const keyPairLocation = adminKeysArg
    ? path.resolve(adminKeysArg)
    : `${process.cwd()}/keyPair.json`

  return keyPairLocation
}

const getKeyPair = () => {
  const keyPairLocation = getKeyPairLocation()
  // eslint-disable-next-line
  const keyPair = require(keyPairLocation)
  return keyPair
}

module.exports = {
  getKeyPair
}
