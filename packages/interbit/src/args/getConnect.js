const { isArg } = require('./getArg')
const argOptions = require('./argOptions')

const getConnect = () => isArg(process.argv, argOptions.CONNECT)

module.exports = getConnect
