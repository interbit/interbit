// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const blockExplorer = require('./blockExplorer')
const middleware = require('./middleware')
const parameterEncoding = require('./parameterEncoding')

module.exports = {
  blockExplorer,
  chainDispatch: middleware.actionCreators.chainDispatch,
  middleware,
  parameterEncoding
}
