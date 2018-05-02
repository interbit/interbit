// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const { startConsumeState, redispatch } = require('interbit-covenant-utils')

const { actionTypes, actionCreators } = require('./actions')
const { PATHS } = require('./constants')

const initialState = Immutable.from({
  // Basic account details for the owner of the chain
  // This is provided by a join to the account chain
  sharedProfile: {}
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHORIZED: {
      console.log('DISPATCH: ', action)
      const { providerChainId, joinName } = action.payload

      const consumeAction = startConsumeState({
        provider: providerChainId,
        mount: PATHS.SHARED_PROFILE,
        joinName
      })

      // HACK: Let consume action happen with the same public key
      consumeAction.publicKey = action.publicKey

      console.log('REDISPATCH: ', consumeAction)
      return redispatch(state, consumeAction)
    }

    default:
      return state
  }
}

module.exports = {
  actionCreators,
  actionTypes,
  initialState,
  reducer
}
