const { getArg } = require('./getArg')
const argOptions = require('./argOptions')

const getPort = () => {
  const portOption = getArg(process.argv, argOptions.PORT)
  return portOption || 5000
}

module.exports = getPort
