const debug = require('debug')

const info = debug('interbit:info')
const error = debug('interbit:error')
const action = debug('interbit:action')
const success = debug('interbit:success')
const warn = debug('interbit:warn')

module.exports = {
  info,
  error,
  warn,
  action,
  success,
  any: debug
}
