const {
  validate,
  objectValidationRules: { required, matches, chainIdPattern, object }
} = require('interbit-covenant-tools')

const actionPrefix = 'app-account-github-kyc'
const controlActionPrefix = 'app-account-control'

const actionTypes = {
  // Admin action dispatched at startup to configure the secrets
  CONFIGURE_OAUTH_APP: `${actionPrefix}/CONFIGURE_OAUTH_APP`,
  OAUTH_CALLBACK: `${actionPrefix}/OAUTH_CALLBACK`,
  OAUTH_CALLBACK_SAGA: `${actionPrefix}/OAUTH_CALLBACK_SAGA`,
  AUTH_REQUESTED: `${actionPrefix}/AUTH_REQUESTED`,
  AUTH_SUCEEDED: `${actionPrefix}/AUTH_SUCEEDED`,
  AUTH_FAILED: `${actionPrefix}/AUTH_FAILED`,
  REGISTER_PRIVATE_CHAIN: `${actionPrefix}/REGISTER_PRIVATE_CHAIN`,
  UPDATE_PRIVATE_CHAIN_ACL: `${actionPrefix}/UPDATE_PRIVATE_CHAIN_ACL`,
  UPDATE_PROFILE: `${actionPrefix}/UPDATE_PROFILE`,
  REMOVE_PROFILE: `${actionPrefix}/REMOVE_PROFILE`,
  SIGN_OUT: `${actionPrefix}/SIGN_OUT`,

  ADD_KEY_TO_SPONSORED_CHAIN: `${controlActionPrefix}/ADD_KEY_TO_SPONSORED_CHAIN`
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
    publicKey,
    browserChainId,
    temporaryToken,
    error,
    errorDescription
  }) => ({
    type: actionTypes.OAUTH_CALLBACK,
    payload: validate(
      {
        requestId,
        publicKey,
        browserChainId,
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
    publicKey,
    browserChainId,
    temporaryToken
  }) => ({
    type: actionTypes.OAUTH_CALLBACK_SAGA,
    payload: validate(
      {
        requestId,
        publicKey,
        browserChainId,
        temporaryToken
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

  authSuceeded: ({
    requestId,
    browserChainId,
    privateChainId,
    providerChainId,
    joinName
  }) => ({
    type: actionTypes.AUTH_SUCEEDED,
    payload: validate(
      {
        requestId,
        browserChainId,
        privateChainId,
        providerChainId,
        joinName
      },
      {
        requestId: required(),
        browserChainId: chainIdPattern(),
        privateChainId: chainIdPattern(),
        providerChainId: chainIdPattern(),
        joinName: required()
      }
    )
  }),

  authFailed: ({ requestId, browserChainId, error }) => ({
    type: actionTypes.AUTH_FAILED,
    payload: validate(
      {
        requestId,
        browserChainId,
        error
      },
      {
        requestId: required()
      }
    )
  }),

  registerPrivateChain: ({ userId, privateChainId, publicKey }) => ({
    type: actionTypes.REGISTER_PRIVATE_CHAIN,
    payload: validate(
      {
        userId,
        privateChainId,
        publicKey
      },
      {
        userId: required(),
        privateChainId: chainIdPattern(),
        publicKey: required()
      }
    )
  }),

  updatePrivateChainAcl: ({ userId, privateChainId, publicKey }) => ({
    type: actionTypes.UPDATE_PRIVATE_CHAIN_ACL,
    payload: validate(
      {
        userId,
        privateChainId,
        publicKey
      },
      {
        userId: required(),
        privateChainId: chainIdPattern(),
        publicKey: required()
      }
    )
  }),

  updateProfile: ({ privateChainId, profile }) => ({
    type: actionTypes.UPDATE_PROFILE,
    payload: validate(
      {
        privateChainId,
        profile
      },
      {
        privateChainId: chainIdPattern(),
        profile: object()
      }
    )
  }),

  removeProfile: ({ privateChainId }) => ({
    type: actionTypes.REMOVE_PROFILE,
    payload: validate(
      {
        privateChainId
      },
      {
        privateChainId: chainIdPattern()
      }
    )
  }),

  signOut: ({ privateChainId }) => ({
    type: actionTypes.SIGN_OUT,
    payload: validate(
      {
        privateChainId
      },
      {
        privateChainId: chainIdPattern()
      }
    )
  }),

  addKeyToSponsoredChain: ({ sponsoredChainId, publicKey }) => ({
    type: actionTypes.ADD_KEY_TO_SPONSORED_CHAIN,
    payload: validate(
      {
        sponsoredChainId,
        publicKey
      },
      {
        sponsoredChainId: chainIdPattern(),
        publicKey: required()
      }
    )
  })
}

module.exports = {
  actionCreators,
  actionTypes
}
