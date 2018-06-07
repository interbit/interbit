const path = require('path')

const { getArg } = require('./getArg')
const { KEY_PAIR } = require('./argOptions')

const getKeyPairLocation = () => {
  const adminKeysArg = getArg(process.argv, KEY_PAIR)
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
