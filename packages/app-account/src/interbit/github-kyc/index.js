/* eslint camelcase: 0 */
// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const uuid = require('uuid')
const {
  coreCovenant: {
    redispatch,
    remoteRedispatch,
    actionCreators: { startProvideState },
    selectors: coreSelectors
  }
} = require('interbit-covenant-tools')

const axios = require('axios')
const { takeEvery, call, put, select } = require('redux-saga').effects

const { actionTypes, actionCreators } = require('./actions')
const { PATHS } = require('./constants')
const selectors = require('./selectors')

const initialState = Immutable.from({
  chainMetadata: { chainName: 'Interbit Accounts - GitHub KYC Provider' },
  oAuth: {
    // This state is shared with the public accouns chain so that it is accessible in the browser
    shared: {
      serviceEndPoint: 'https://github.com/login/oauth/authorize',
      params: {
        // Client ID for "Interbit Accounts (Dev)" GitHub OAuth application
        client_id: process.env.GITHUB_CLIENT_ID,
        // Must start with the root of the callback URL configured in GitHub
        // TODO: Allow this to be injected from the environment
        redirect_uri: process.env.GITHUB_REDIRECT_URL,
        // Only request the bare minimum public profile
        scope: '',
        // No reason why users can sign up for a GitHub account as part of the process
        allow_signup: 'true'
      }
    },
    // These parameters are internal to the covenant and are not shared
    tokenUrl: 'https://github.com/login/oauth/access_token',
    profileUrl: 'https://api.github.com/user',
    callbackUrl: process.env.OAUTH_CALLBACK_URL
  },

  // User profiles by chain ID. State shape is:
  //
  // profiles: {
  //   [privateChainId]: {
  //     sharedProfile: {
  //       id: 1234567,
  //       login: 'joeb',
  //       name: 'Joe Bloggs'
  //       avatarUrl: 'http://ddhhgjhfhjhfjha.png',
  //       timestamp: 1234567890
  //     }
  //   }
  // }
  profiles: {},

  // Users by GitHub ID: State shape is:
  //
  // users: {
  //   [1234567]: {
  //     privateChainId: 'abcdef123...',
  //     publicKeys: [
  //       '----BEGIN PUBLIC KEY...'
  //     ]
  //   }
  // }
  users: {},

  // Authentication requests in progress
  // (to prevent re-entrant authorization requests)
  authenticationRequests: {}
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  let nextState = state

  switch (action.type) {
    case actionTypes.CONFIGURE_OAUTH_APP: {
      console.log('DISPATCH: ', action)

      const {
        oldClientId,
        newClientId,
        redirectUrl = selectors.redirectUrl(state),
        scope = selectors.scope(state),
        allowSignup = selectors.allowSignup(state)
      } = action.payload

      // Only allow update if the action shows knowledge of the last state
      const currentClientId = selectors.clientId(state)

      if (!currentClientId || currentClientId === oldClientId) {
        nextState
          .setIn(PATHS.CLIENT_ID, newClientId)
          .setIn(PATHS.REDIRECT_URL, redirectUrl)
          .setIn(PATHS.SCOPE, scope)
          .setIn(PATHS.ALLOW_SIGNUP, allowSignup)

        return nextState
      }
      return state
    }

    case actionTypes.OAUTH_CALLBACK: {
      console.log('DISPATCH: ', action)
      const {
        requestId,
        publicKey,
        browserChainId,
        temporaryToken,
        error,
        errorDescription
      } = action.payload

      if (error) {
        const failedAction = actionCreators.authFailed({
          requestId,
          browserChainId,
          error: errorDescription || error
        })

        console.log('REDISPATCH: ', failedAction)
        nextState = redispatch(nextState, failedAction)
        return nextState
      }

      if (
        authenticationRequestExists(state, {
          requestId,
          temporaryToken
        })
      ) {
        return state
      }

      nextState = saveAuthenticationRequest(nextState, {
        requestId,
        temporaryToken
      })

      const sagaAction = actionCreators.oAuthCallbackSaga({
        requestId,
        publicKey,
        browserChainId,
        temporaryToken
      })

      console.log('REDISPATCH: ', sagaAction)
      nextState = redispatch(nextState, sagaAction)
      return nextState
    }

    case actionTypes.UPDATE_PROFILE: {
      console.log('DISPATCH: ', action)
      const { privateChainId, profile } = action.payload

      nextState = saveProfile(nextState, { privateChainId, profile })
      return nextState
    }

    case actionTypes.REGISTER_PRIVATE_CHAIN: {
      console.log('DISPATCH: ', action)
      const { userId, privateChainId, publicKey } = action.payload

      nextState = registerPrivateChain(nextState, {
        userId,
        privateChainId,
        publicKey
      })
      return nextState
    }

    case actionTypes.UPDATE_PRIVATE_CHAIN_ACL: {
      console.log('DISPATCH: ', action)
      const { userId, privateChainId, publicKey } = action.payload

      if (hasPublicKey(state, { userId, publicKey })) {
        return state
      }

      const controlChainId = getControlChainId(state)

      const actionToForward = actionCreators.addKeyToSponsoredChain({
        sponsoredChainId: privateChainId,
        authorizedActions: '*',
        role: `GITHUB-${userId}`,
        publicKey
      })

      console.log('REMOTE DISPATCH: ', actionToForward)
      nextState = remoteRedispatch(nextState, controlChainId, actionToForward)

      nextState = registerPublicKey(nextState, { userId, publicKey })
      return nextState
    }

    case actionTypes.REMOVE_PROFILE: {
      console.log('DISPATCH: ', action)
      const { privateChainId } = action.payload

      nextState = removeProfile(nextState, { privateChainId })
      return nextState
    }

    case actionTypes.AUTH_REQUESTED: {
      console.log('DISPATCH: ', action)
      const { requestId, temporaryToken } = action.payload

      nextState = saveAuthenticationRequest(nextState, {
        requestId,
        temporaryToken
      })
      return nextState
    }

    case actionTypes.AUTH_SUCEEDED: {
      console.log('DISPATCH: ', action)
      const { requestId } = action.payload

      nextState = removeAuthenticationRequest(nextState, { requestId })
      return nextState
    }

    case actionTypes.AUTH_FAILED: {
      console.log('DISPATCH: ', action)
      const { requestId, browserChainId } = action.payload

      nextState = removeAuthenticationRequest(nextState, { requestId })
      nextState = removeProfile(nextState, { privateChainId: browserChainId })
      return nextState
    }

    case actionTypes.SIGN_OUT: {
      console.log('DISPATCH: ', action)
      const { privateChainId } = action.payload

      // TODO: Consider what should happen when a user signs out
      // May want a separate token
      nextState = removeProfile(nextState, { privateChainId })
      return nextState
    }

    default: {
      console.log('NOT HANDLED: ', action)
      return state
    }
  }
}

const authenticationRequestExists = (state, { requestId, temporaryToken }) =>
  requestId &&
  temporaryToken &&
  state.getIn(['authenticationRequests', requestId]) === temporaryToken

const saveAuthenticationRequest = (state, { requestId, temporaryToken }) =>
  state.setIn(['authenticationRequests', requestId], temporaryToken)

const removeAuthenticationRequest = (state, { requestId }) =>
  state.updateIn(['authenticationRequests'], Immutable.without, requestId)

const saveProfile = (state, { privateChainId, profile }) =>
  state.setIn(['profiles', privateChainId, 'sharedProfile'], profile)

const removeProfile = (state, { privateChainId }) =>
  state.updateIn(['profiles'], Immutable.without, privateChainId)

const registerPrivateChain = (state, { userId, privateChainId, publicKey }) =>
  state.setIn(['users', userId], { privateChainId, publicKeys: [publicKey] })

const registerPublicKey = (state, { userId, publicKey }) => {
  const path = ['users', userId, 'publicKeys']
  const publicKeys = state.getIn(path, [])
  if (publicKeys.includes(publicKey)) {
    return state
  }

  return state.setIn(path, [...publicKeys, publicKey])
}

const hasPublicKey = (state, { userId, publicKey }) => {
  const publicKeys = state.getIn(['users', userId, 'publicKeys'], [])
  return publicKeys.includes(publicKey)
}

const getPrivateChainId = (state, { userId }) =>
  state.getIn(['users', userId, 'privateChainId'])

const getControlChainId = state => state.getIn(['controlChainId'])

const findExistingJoin = (state, { privateChainId }) => {
  const joinProviders = selectors.joinProviders(state)
  return joinProviders.find(
    join =>
      join.consumer === privateChainId && join.joinName.startsWith('GITHUB-')
  )
}

function* rootSaga() {
  console.log(`ROOT SAGA: watching for ${actionTypes.OAUTH_CALLBACK_SAGA}`)
  yield takeEvery(actionTypes.OAUTH_CALLBACK_SAGA, oAuthCallbackSaga)
}

// Inject dependencies to make the saga testable
function* oAuthCallbackSaga(action, fetchApi = axios) {
  console.log('SAGA: ', action)

  const {
    requestId,
    publicKey,
    browserChainId,
    temporaryToken
  } = action.payload

  try {
    const providerChainId = yield select(coreSelectors.chainId)
    const oAuthConfig = yield select(selectors.oAuthConfig)
    const {
      tokenUrl,
      profileUrl,
      shared: {
        params: { client_id }
      }
    } = oAuthConfig

    // Convert the temporay token from the oAuth callback
    // into an oAuth access token
    const accessToken = yield call(
      fetchAuthToken,
      {
        tokenUrl,
        client_id,
        requestId,
        temporaryToken
      },
      fetchApi
    )

    // Use the authorization token to get the Github profile
    const profile = yield call(
      fetchPublicProfile,
      { profileUrl, accessToken },
      fetchApi
    )

    // Use profile.id to see if we already have a private chain for this user
    const { id: userId } = profile
    const privateChainId = yield call(enablePrivateChain, {
      userId,
      publicKey,
      browserChainId
    })

    // Make the github profile sharable to complete the cAuth loop
    const joinName = yield call(shareProfile, { privateChainId })

    yield put(actionCreators.updateProfile({ privateChainId, profile }))

    // This action will be picked up by waitForOAuth
    yield put(
      actionCreators.authSuceeded({
        requestId,
        browserChainId,
        privateChainId,
        providerChainId,
        joinName
      })
    )
  } catch (e) {
    // Remove the request and shared data
    yield put(
      actionCreators.authFailed({
        requestId,
        browserChainId,
        error: e.message
      })
    )
  }
}

function* fetchAuthToken(
  { tokenUrl, client_id, requestId, temporaryToken },
  fetchApi
) {
  const params = {
    client_id,
    code: temporaryToken,
    state: requestId
  }

  console.log('POST: ', tokenUrl, params)

  params.client_secret = process.env.GITHUB_CLIENT_SECRET

  const getTokenQuery = yield call(
    fetchApi.post,
    tokenUrl,
    {},
    {
      params,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
  const getTokenResult = getTokenQuery.data

  // If API returns 200, result will either contain an access token
  // or an error such as bad authorization code
  const {
    access_token: accessToken,
    error,
    error_description: errorDescription
  } = getTokenResult

  if (error) {
    console.log(`Authentication failed: ${error} ${errorDescription}`)
    throw new Error(errorDescription || error)
  }
  return accessToken
}

function* fetchPublicProfile({ profileUrl, accessToken }, fetchApi) {
  console.log('GET: ', profileUrl)
  const getProfileResult = yield call(fetchApi.get, profileUrl, {
    params: {
      access_token: accessToken
    },
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  })

  const publicProfile = getProfileResult.data
  if (!publicProfile.login) {
    console.log('Authentication failed: No login')
    throw new Error('Authentication failed')
  }

  if (publicProfile.type !== 'User') {
    console.log('Authentication failed: Not a user')
    throw new Error('Authentication failed')
  }

  const profile = extractProfile(publicProfile)

  return profile
}

// This is only a subset of the public profile properties but
// confirms that we know who you are. We are not using other
// properties, such as email, for other purposes.
const extractProfile = ({ login, id, name, avatar_url }) => ({
  id,
  login,
  name,
  avatarUrl: avatar_url,
  timestamp: Date.now()
})

function* enablePrivateChain({ userId, publicKey, browserChainId }) {
  const existingPrivateChainId = yield select(getPrivateChainId, {
    userId
  })

  if (existingPrivateChainId) {
    // The GitHub user ID is already associated with a private chain
    // Make sure the user can access it
    yield put(
      actionCreators.updatePrivateChainAcl({
        userId,
        privateChainId: existingPrivateChainId,
        publicKey
      })
    )

    return existingPrivateChainId
  }

  // The GitHub user ID is not yet associated with a private chain
  // Use the chain created in the browser
  yield put(
    actionCreators.registerPrivateChain({
      userId,
      privateChainId: browserChainId,
      publicKey
    })
  )

  return browserChainId
}

function* shareProfile({ privateChainId }) {
  const existingJoin = yield select(findExistingJoin, { privateChainId })
  if (existingJoin) {
    console.log(`Already providing GitHub profile to ${privateChainId}.`)
    return existingJoin.joinName
  }

  const joinName = yield call(generateJoinName)
  yield put(
    startProvideState({
      consumer: privateChainId,
      statePath: ['profiles', privateChainId, 'sharedProfile'],
      joinName
    })
  )

  console.log(`Providing GitHub profile to ${privateChainId}.`)
  return joinName
}

const generateJoinName = () => `GITHUB-${uuid.v4().toUpperCase()}`

module.exports = {
  actionTypes,
  actionCreators,
  reducer,
  rootSaga,
  selectors,
  // These are only exposed for testing
  initialState,
  oAuthCallbackSaga
}
