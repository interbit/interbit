// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const {
  coreCovenant: { remoteRedispatch }
} = require('interbit-covenant-tools')

const { actionTypes, actionCreators } = require('./actions')
const { getOAuthProviderChainId } = require('./selectors')
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

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  let nextState = state

  switch (action.type) {
    case actionTypes.OAUTH_SIGN_IN: {
      console.log('DISPATCH: ', action)
      const {
        oAuthProvider,
        consumerChainId,
        requestId,
        joinName,
        temporaryToken
      } = action.payload

      const providerChainId = getOAuthProviderChainId(state, oAuthProvider)

      const actionToForward = actionCreators.oAuthCallback({
        consumerChainId,
        requestId,
        joinName,
        temporaryToken
      })

      console.log('REMOTE DISPATCH: ', actionToForward)
      nextState = remoteRedispatch(nextState, providerChainId, actionToForward)

      return nextState
    }

    case actionTypes.OAUTH_SIGN_OUT: {
      console.log('DISPATCH: ', action)
      const { oAuthProvider, consumerChainId } = action.payload

      const providerChainId = getOAuthProviderChainId(state, oAuthProvider)

      const actionToForward = actionCreators.signOut({ consumerChainId })

      console.log('REMOTE DISPATCH: ', actionToForward)
      nextState = remoteRedispatch(nextState, providerChainId, actionToForward)

      return nextState
    }

    default:
      return state
  }
}

module.exports = {
  actionTypes,
  actionCreators,
  reducer
}
