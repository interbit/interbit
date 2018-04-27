const uuid = require('uuid')

const covenantName = 'app-account-my-account'

const actionTypes = {
  UPDATE_PROFILE: `${covenantName}/UPDATE_PROFILE`,
  SHARE_PROFILE_TOKENS: `${covenantName}/SHARE_PROFILE_TOKENS`,
  STOP_SHARING: `${covenantName}/STOP_SHARING`,
  START_AUTHENTICATION: `${covenantName}/START_AUTHENTICATION`,
  CANCEL_AUTHENTICATION: `${covenantName}/CANCEL_AUTHENTICATION`,
  COMPLETE_AUTHENTICATION: `${covenantName}/COMPLETE_AUTHENTICATION`
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
    type: actionTypes.START_AUTHENTICATION,
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
