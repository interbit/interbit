// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const {
  coreCovenant: {
    redispatch,
    actionCreators: { startConsumeState, startProvideState }
  }
} = require('interbit-covenant-tools')
const { actionTypes, actionCreators } = require('./actions')
const { PATHS, SHARED_PROFILE } = require('./constants')

const initialState = Immutable.from({
  chainMetadata: {
    chainName: 'Personal Account Chain'
  },
  // Tokens comprising the user's profile
  // These tokens are NEVER shared directly
  profile: {
    name: 'anonymous user'
  },
  // Tokens that user has explicitly shared with other
  // chains through the cAuthloop. This ensures that
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

      const profile = state.getIn(PATHS.PRIVATE_PROFILE)

      nextState = makeProfileShareable(nextState, {
        consumerChainId,
        joinName,
        profile,
        sharedTokens
      })

      const provideAction = startProvideState({
        consumer: consumerChainId,
        statePath: [...PATHS.SHARED_ROOT, consumerChainId, SHARED_PROFILE],
        joinName
      })

      console.log('REDISPATCH: ', provideAction)
      nextState = redispatch(nextState, provideAction)

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

      nextState = nextState.setIn([...PATHS.AUTH_REQUESTS, requestId], {
        oAuthProvider,
        timestamp
      })
      return nextState
    }

    case actionTypes.CANCEL_AUTHENTICATION: {
      console.log('DISPATCH: ', action)
      const { requestId } = action.payload

      const request = state.getIn([...PATHS.AUTH_REQUESTS, requestId])

      if (!request) {
        throw new Error('You did not originate this request')
      }

      nextState = removeAuthenticationRequest(nextState, requestId)
      return nextState
    }

    case actionTypes.COMPLETE_AUTHENTICATION: {
      console.log('DISPATCH: ', action)

      const { requestId, providerChainId, tokenName, joinName } = action.payload

      const request = state.getIn([...PATHS.AUTH_REQUESTS, requestId])
      if (!request) {
        console.log(`Request ${requestId} not found.`)
        return state
      }

      const existingJoin = findExistingJoin(state, {
        providerChainId,
        joinName
      })

      if (existingJoin) {
        console.log(`Join ${existingJoin.joinName} already configured.`)
      } else {
        const consumeAction = startConsumeState({
          provider: providerChainId,
          mount: [...PATHS.PRIVATE_PROFILE, tokenName],
          joinName
        })

        console.log('REDISPATCH: ', consumeAction)
        nextState = redispatch(nextState, consumeAction)
      }

      nextState = removeAuthenticationRequest(nextState, requestId)
      return nextState
    }

    default:
      return state
  }
}

const findExistingJoin = (state, { providerChainId, joinName }) => {
  const joinConsumers = state.getIn(PATHS.CONSUMING, [])
  return joinConsumers.find(
    join => join.provider === providerChainId && join.joinName === joinName
  )
}

const updateProfile = (state, { alias, name, email }) => {
  const tokensToReplace = removeEmptyProperties({
    alias,
    name,
    email
  })

  return mergeAtPath(state, PATHS.PRIVATE_PROFILE, tokensToReplace, {})
}

const removeEmptyProperties = payload =>
  Object.entries(payload).reduce(
    (cleaned, [token, value]) =>
      value ? { ...cleaned, [token]: value } : cleaned,
    {}
  )

const mergeAtPath = (state, path, value, options = { deep: true }) => {
  const currentValue = state.getIn(path, Immutable.from({}))
  const newValue = currentValue.merge(value, options)
  return state.setIn(path, newValue)
}

const makeProfileShareable = (
  state,
  { consumerChainId, joinName, profile, sharedTokens }
) =>
  state.setIn([...PATHS.SHARED_ROOT, consumerChainId], {
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
  state.updateIn([PATHS.SHARED_ROOT], Immutable.without, consumerChainId)

const updateSharedProfiles = (state, profile) =>
  Object.keys(state.shared || {}).reduce(
    (nextState, chainId) =>
      nextState.updateIn(
        [...PATHS.SHARED_ROOT, chainId],
        updateSharedProfile,
        profile
      ),
    state
  )

const updateSharedProfile = (current, profile) => ({
  ...current,
  sharedProfile: filterTokens(profile, current.sharedTokens)
})

const removeAuthenticationRequest = (state, requestId) =>
  state.updateIn([...PATHS.AUTH_REQUESTS], Immutable.without, requestId)

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
