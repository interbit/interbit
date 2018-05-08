// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')

const { actionTypes, actionCreators } = require('./actions')
const interbitServices = require('./interbitServices')

const initialState = Immutable.from({
  chainMetadata: { chainName: 'Interbit Accounts' },
  // TODO: Provide using a read join to the DNS chain
  dns: {
    interbitServices
  },
  // Identity providers for authorization
  identityProviders: {
    oauth: {}
  },
  // Hosting private chains
  privateChainHosting: {}
})

const reducer = (state = initialState, action) => state

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
