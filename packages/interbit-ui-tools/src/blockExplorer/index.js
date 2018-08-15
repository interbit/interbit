// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { actionTypes, actionCreators } = require('./actions')
const { reducer, initialState } = require('./reducer')
const selectors = require('./selectors')

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer,
  selectors
}
