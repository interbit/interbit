// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const utils = require('interbit-covenant-utils')
const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  chainMetadata: {
    name: 'anonymous user',
    chainName: 'Personal Account Chain'
  },
  // Tokens comprising the user's profile
  // These tokens are NEVER shared directly
  profile: {
    name: 'anonymous user'
  },
  // Tokens that user has explicitly shared with other
  // chains through the cAuth loop. This ensures that
  // the user has full control over what information is
  // shared and can revoke access at any time.
  shared: {},
  // Keep track of current authentication requests
  authenticationRequests: {}
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }
  console.log(action)
  let nextState = state

  switch (action.type) {
    case actionTypes.UPDATE_PROFILE: {
      const { alias, name, email } = action.payload
      nextState = updateProfile(nextState, { alias, name, email })
      nextState = updateSharedProfiles(nextState, { alias, name, email })
      return nextState
    }

    case actionTypes.SHARE_PROFILE_TOKENS: {
      console.log('DISPATCH: ', action)
      const { consumerChainId, joinName, sharedTokens } = action.payload

      const profile = state.getIn(['profile'])

      nextState = makeProfileShareable(nextState, {
        consumerChainId,
        joinName,
        profile,
        sharedTokens
      })

      const provideAction = utils.startProvideState({
        consumer: consumerChainId,
        statePath: ['shared', consumerChainId, 'sharedProfile'],
        joinName
      })

      console.log('REDISPATCH: ', provideAction)
      nextState = utils.redispatch(nextState, provideAction)

      return nextState
    }

    case actionTypes.STOP_SHARING: {
      console.log('DISPATCH: ', action)
      const { consumerChainId } = action.payload

      // This removes the data that would be shared
      // TODO: Terminate the read join too
      return removeSharedProfile(state, consumerChainId)
    }

    case actionTypes.START_AUTHENTICATION: {
      console.log('DISPATCH: ', action)
      const { oAuthProvider, requestId, timestamp } = action.payload

      nextState = nextState.setIn(['authenticationRequests', requestId], {
        oAuthProvider,
        timestamp
      })
      return nextState
    }

    case actionTypes.CANCEL_AUTHENTICATION: {
      console.log('DISPATCH: ', action)
      const { requestId } = action.payload

      const request = state.getIn(['authenticationRequests', requestId])

      if (!request) {
        throw new Error('You did not originate this request')
      }

      nextState = removeAuthenticationRequest(nextState, requestId)
      return nextState
    }

    case actionTypes.COMPLETE_AUTHENTICATION: {
      console.log('DISPATCH: ', action)

      const { requestId, providerChainId, tokenName, joinName } = action.payload

      const request = state.getIn(['authenticationRequests', requestId])

      if (!request) {
        throw new Error('You did not originate this request')
      }
      // TODO: Check for stale requests

      const consumeAction = utils.startConsumeState({
        provider: providerChainId,
        mount: ['profile', tokenName],
        joinName
      })

      console.log('REDISPATCH: ', consumeAction)
      nextState = utils.redispatch(nextState, consumeAction)
      nextState = removeAuthenticationRequest(nextState, requestId)
      return nextState
    }

    default:
      return state
  }
}

const updateProfile = (state, { alias, name, email }) => {
  const current = state.getIn(['profile'], Immutable.from({}))
  const updated = current.merge({
    alias,
    name,
    email
  })
  return state
    .setIn(['profile'], updated)
    .setIn(['chainMetadata', 'name'], alias || 'anonymous user')
}

const makeProfileShareable = (
  state,
  { consumerChainId, joinName, profile, sharedTokens }
) =>
  state.setIn(['shared', consumerChainId], {
    sharedTokens,
    sharedProfile: filterTokens(profile, sharedTokens),
    joinName
  })

const filterTokens = (profile, sharedTokens) =>
  sharedTokens.reduce(
    (sharedProfile, tokenName) => ({
      ...sharedProfile,
      [tokenName]: profile[tokenName]
    }),
    {}
  )

const removeSharedProfile = (state, consumerChainId) =>
  state.updateIn(['shared'], Immutable.without, consumerChainId)

const updateSharedProfiles = (state, profile) =>
  Object.keys(state.shared || {}).reduce(
    (nextState, chainId) =>
      nextState.updateIn(['shared', chainId], updateSharedProfile, profile),
    state
  )

const updateSharedProfile = (current, profile) => ({
  ...current,
  sharedProfile: filterTokens(profile, current.sharedTokens)
})

const removeAuthenticationRequest = (state, requestId) =>
  state.updateIn(['authenticationRequests'], Immutable.without, requestId)

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
