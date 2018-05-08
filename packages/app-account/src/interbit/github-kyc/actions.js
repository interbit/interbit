const uuid = require('uuid')

const covenantName = 'app-account-github-kyc'

const actionTypes = {
  // Admin action dispatched at startup to configure the secrets
  CONFIGURE_OAUTH_APP: `${covenantName}/CONFIGURE_OAUTH_APP`,
  OAUTH_CALLBACK: `${covenantName}/OAUTH_CALLBACK`,
  OAUTH_CALLBACK_SAGA: `${covenantName}/OAUTH_CALLBACK_SAGA`,
  AUTH_REQUESTED: `${covenantName}/AUTH_REQUESTED`,
  AUTH_SUCEEDED: `${covenantName}/AUTH_SUCEEDED`,
  AUTH_FAILED: `${covenantName}/AUTH_FAILED`,
  UPDATE_PROFILE: `${covenantName}/UPDATE_PROFILE`,
  SHARE_PROFILE: `${covenantName}/SHARE_PROFILE`,
  REMOVE_PROFILE: `${covenantName}/REMOVE_PROFILE`,
  SIGN_OUT: `${covenantName}/SIGN_OUT`
}

const generateJoinName = () => `GITHUB-${uuid.v4().toUpperCase()}`

const actionCreators = {
  configureOauthApp: ({
    oldClientId,
    newClientId,
    oldClientSecret,
    newClientSecret,
    redirectUrl,
    scope = '',
    allowSignup = true
  }) => ({
    type: actionTypes.CONFIGURE_OAUTH_APP,
    payload: {
      oldClientId,
      newClientId,
      oldClientSecret,
      newClientSecret,
      redirectUrl,
      scope,
      allowSignup
    }
  }),

  oAuthCallback: ({
    requestId,
    consumerChainId,
    temporaryToken,
    error,
    errorDescription
  }) => ({
    type: actionTypes.OAUTH_CALLBACK,
    payload: {
      requestId,
      consumerChainId,
      joinName: generateJoinName(),
      temporaryToken,
      error,
      errorDescription
    }
  }),

  oAuthCallbackSaga: ({
    requestId,
    consumerChainId,
    joinName,
    temporaryToken,
    error,
    errorDescription
  }) => ({
    type: actionTypes.OAUTH_CALLBACK_SAGA,
    payload: {
      requestId,
      consumerChainId,
      joinName,
      temporaryToken,
      error,
      errorDescription
    }
  }),

  authRequested: ({ requestId, temporaryToken }) => ({
    type: actionTypes.AUTH_REQUESTED,
    payload: { requestId, temporaryToken }
  }),

  authSuceeded: ({ requestId, joinName }) => ({
    type: actionTypes.AUTH_SUCEEDED,
    payload: { requestId, joinName }
  }),

  authFailed: ({ requestId, consumerChainId, error }) => ({
    type: actionTypes.AUTH_FAILED,
    payload: { requestId, consumerChainId, error }
  }),

  updateProfile: ({ consumerChainId, profile }) => ({
    type: actionTypes.UPDATE_PROFILE,
    payload: { consumerChainId, profile }
  }),

  shareProfile: ({ consumerChainId, joinName }) => ({
    type: actionTypes.SHARE_PROFILE,
    payload: { consumerChainId, joinName }
  }),

  removeProfile: ({ consumerChainId }) => ({
    type: actionTypes.REMOVE_PROFILE,
    payload: { consumerChainId }
  }),

  signOut: ({ consumerChainId }) => ({
    type: actionTypes.SIGN_OUT,
    payload: {
      consumerChainId
    }
  })
}

module.exports = {
  actionCreators,
  actionTypes
}
