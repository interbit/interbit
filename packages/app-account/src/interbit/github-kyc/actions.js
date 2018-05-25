const {
  validate,
  objectValidationRules: { required, matches, chainIdPattern, object }
} = require('interbit-covenant-tools')

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
  REMOVE_PROFILE: `${covenantName}/REMOVE_PROFILE`,
  SIGN_OUT: `${covenantName}/SIGN_OUT`
}

const GITHUB_CLIENT_ID_PATTERN = /^[0-9A-Fa-f]{20}$/

const actionCreators = {
  configureOauthApp: ({
    oldClientId,
    newClientId,
    redirectUrl,
    scope = '',
    allowSignup = true
  }) => ({
    type: actionTypes.CONFIGURE_OAUTH_APP,
    payload: validate(
      {
        oldClientId,
        newClientId,
        redirectUrl,
        scope,
        allowSignup
      },
      {
        newCliendId: matches(GITHUB_CLIENT_ID_PATTERN),
        redirectUrl: required()
      }
    )
  }),

  oAuthCallback: ({
    requestId,
    consumerChainId,
    temporaryToken,
    error,
    errorDescription
  }) => ({
    type: actionTypes.OAUTH_CALLBACK,
    payload: validate(
      {
        requestId,
        consumerChainId,
        temporaryToken,
        error,
        errorDescription
      },
      {
        requestId: required()
      }
    )
  }),

  oAuthCallbackSaga: ({
    requestId,
    consumerChainId,
    temporaryToken,
    error,
    errorDescription
  }) => ({
    type: actionTypes.OAUTH_CALLBACK_SAGA,
    payload: validate(
      {
        requestId,
        consumerChainId,
        temporaryToken,
        error,
        errorDescription
      },
      {
        requestId: required()
      }
    )
  }),

  authRequested: ({ requestId, temporaryToken }) => ({
    type: actionTypes.AUTH_REQUESTED,
    payload: validate(
      {
        requestId,
        temporaryToken
      },
      {
        requestId: required(),
        temporaryToken: required()
      }
    )
  }),

  authSuceeded: ({ requestId, joinName }) => ({
    type: actionTypes.AUTH_SUCEEDED,
    payload: validate(
      {
        requestId,
        joinName
      },
      {
        requestId: required(),
        joinName: required()
      }
    )
  }),

  authFailed: ({ requestId, consumerChainId, error }) => ({
    type: actionTypes.AUTH_FAILED,
    payload: validate(
      {
        requestId,
        consumerChainId,
        error
      },
      {
        requestId: required()
      }
    )
  }),

  updateProfile: ({ consumerChainId, profile }) => ({
    type: actionTypes.UPDATE_PROFILE,
    payload: validate(
      {
        consumerChainId,
        profile
      },
      {
        consumerChainId: chainIdPattern(),
        profile: object()
      }
    )
  }),

  removeProfile: ({ consumerChainId }) => ({
    type: actionTypes.REMOVE_PROFILE,
    payload: validate(
      {
        consumerChainId
      },
      {
        consumerChainId: chainIdPattern()
      }
    )
  }),

  signOut: ({ consumerChainId }) => ({
    type: actionTypes.SIGN_OUT,
    payload: validate(
      {
        consumerChainId
      },
      {
        consumerChainId: chainIdPattern()
      }
    )
  })
}

module.exports = {
  actionCreators,
  actionTypes
}
