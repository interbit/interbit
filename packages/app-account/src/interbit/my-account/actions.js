const uuid = require('uuid')

const actionPrefix = 'app-account-my-account'

const actionTypes = {
  UPDATE_PROFILE: `${actionPrefix}/UPDATE_PROFILE`,
  SHARE_PROFILE_TOKENS: `${actionPrefix}/SHARE_PROFILE_TOKENS`,
  STOP_SHARING: `${actionPrefix}/STOP_SHARING`,
  START_AUTHENTICATION: `${actionPrefix}/START_AUTHENTICATION`,
  CANCEL_AUTHENTICATION: `${actionPrefix}/CANCEL_AUTHENTICATION`,
  COMPLETE_AUTHENTICATION: `${actionPrefix}/COMPLETE_AUTHENTICATION`
}

const generateJoinName = () => `PROFILE-${uuid.v4().toUpperCase()}`

const actionCreators = {
  updateProfile: ({ alias, name, email }) => ({
    type: actionTypes.UPDATE_PROFILE,
    payload: {
      alias,
      name,
      email
    }
  }),

  shareProfileTokens: ({ consumerChainId, sharedTokens }) => ({
    type: actionTypes.SHARE_PROFILE_TOKENS,
    payload: {
      consumerChainId,
      joinName: generateJoinName(),
      sharedTokens
    }
  }),

  stopSharing: ({ providerChainId, consumerChainId }) => ({
    type: actionTypes.STOP_SHARING,
    payload: {
      consumerChainId
    }
  }),

  startAuthentication: ({
    oAuthProvider,
    requestId,
    timestamp = Date.now()
  }) => ({
    type: actionTypes.START_AUTHENTICATION,
    payload: {
      oAuthProvider,
      requestId,
      timestamp
    }
  }),

  cancelAuthentication: ({ requestId }) => ({
    type: actionTypes.CANCEL_AUTHENTICATION,
    payload: {
      requestId
    }
  }),

  completeAuthentication: ({
    oAuthProvider,
    providerChainId,
    tokenName,
    joinName,
    requestId,
    timestamp = Date.now()
  }) => ({
    type: actionTypes.COMPLETE_AUTHENTICATION,
    payload: {
      oAuthProvider,
      providerChainId,
      tokenName,
      joinName,
      requestId,
      timestamp
    }
  })
}

module.exports = {
  actionCreators,
  actionTypes
}
