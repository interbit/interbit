const debug = require('debug')

const info = debug('info')
const error = debug('error')
const action = debug('action')
const success = debug('success')

module.exports = {
  info,
  error,
  action,
  success,
  any: debug
}
