/* eslint camelcase: 0 */
// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const uuid = require('uuid')
const {
  coreCovenant: {
    redispatch,
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
  //   [consumerChainId]: {
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
        consumerChainId,
        temporaryToken,
        error,
        errorDescription
      } = action.payload

      if (error) {
        const failedAction = actionCreators.authFailed({
          requestId,
          consumerChainId,
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
        consumerChainId,
        temporaryToken
      })

      console.log('REDISPATCH: ', sagaAction)
      nextState = redispatch(nextState, sagaAction)
      return nextState
    }

    case actionTypes.UPDATE_PROFILE: {
      console.log('DISPATCH: ', action)
      const { consumerChainId, profile } = action.payload

      nextState = saveProfile(nextState, { consumerChainId, profile })
      return nextState
    }

    case actionTypes.REMOVE_PROFILE: {
      console.log('DISPATCH: ', action)
      const { consumerChainId } = action.payload

      nextState = removeProfile(nextState, { consumerChainId })
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
      const { requestId, consumerChainId } = action.payload

      nextState = removeAuthenticationRequest(nextState, { requestId })
      nextState = removeProfile(nextState, { consumerChainId })
      return nextState
    }

    case actionTypes.SIGN_OUT: {
      console.log('DISPATCH: ', action)
      const { consumerChainId } = action.payload

      // TODO: Consider what should happen when a user signs out
      // May want a separate token
      nextState = removeProfile(nextState, { consumerChainId })
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

const saveProfile = (state, { consumerChainId, profile }) =>
  state.setIn(['profiles', consumerChainId, 'sharedProfile'], profile)

const removeProfile = (state, { consumerChainId }) =>
  state.updateIn(['profiles'], Immutable.without, consumerChainId)

const findExistingJoin = (state, { consumerChainId }) => {
  const joinProviders = selectors.joinProviders(state)
  return joinProviders.find(
    join =>
      join.consumer === consumerChainId && join.joinName.startsWith('GITHUB-')
  )
}

function* rootSaga() {
  console.log(`ROOT SAGA: watching for ${actionTypes.OAUTH_CALLBACK_SAGA}`)
  yield takeEvery(actionTypes.OAUTH_CALLBACK_SAGA, oAuthCallbackSaga)
}

// Inject dependencies to make the saga testable
function* oAuthCallbackSaga(action, fetchApi = axios) {
  console.log('SAGA: ', action)

  const { requestId, consumerChainId, temporaryToken } = action.payload

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

    // TODO: Use profile.id to see if we already have a private chain for this user
    // If so, return the chain id with an instruction to load it
    // if not, return the join name with an instruction to load it (or could create the chain)

    // Make the github profile sharable to complete the cAuth loop
    const joinName = yield call(shareProfile, { consumerChainId })

    yield put(actionCreators.updateProfile({ consumerChainId, profile }))
    yield put(
      actionCreators.authSuceeded({
        requestId,
        consumerChainId,
        providerChainId,
        joinName
      })
    )
  } catch (e) {
    // Remove the request and shared data
    yield put(
      actionCreators.authFailed({
        requestId,
        consumerChainId,
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

function* shareProfile({ consumerChainId }) {
  const existingJoin = yield select(findExistingJoin, { consumerChainId })
  if (existingJoin) {
    console.log(`Already providing GitHub profile to ${consumerChainId}.`)
    return existingJoin.joinName
  }

  const joinName = yield call(generateJoinName)
  yield put(
    startProvideState({
      consumer: consumerChainId,
      statePath: ['profiles', consumerChainId, 'sharedProfile'],
      joinName
    })
  )

  console.log(`Providing GitHub profile to ${consumerChainId}.`)
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
