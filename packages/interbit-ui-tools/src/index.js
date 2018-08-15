// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  actionCreators,
  actionTypes,
  actionCreators: { chainDispatch },
  createMiddleware,
  reducer,
  rootSaga,
  selectors
} = require('./middleware')

const blockExplorerRedux = require('./blockExplorer')
const parameterEncoding = require('./parameterEncoding')

module.exports = {
  interbitRedux: {
    chainDispatch,
    createMiddleware,
    actionCreators,
    actionTypes,
    reducer,
    rootSaga,
    selectors
  },
  blockExplorerRedux,
  parameterEncoding
}
