const covenantName = 'app-account-control'

const actionTypes = {
  COMPLETE_AUTHENTICATION: `${covenantName}/COMPLETE_AUTHENTICATION`,
  CANCEL_AUTHENTICATION: `${covenantName}/CANCEL_AUTHENTICATION`
}

const actionCreators = {
  cancelAuthentication: ({ consumerChainId, requestId }) => ({
    type: actionTypes.START_AUTHENTICATION,
    payload: {
      consumerChainId,
      requestId
    }
  }),

  completeAuthentication: ({
    oAuthProvider,
    consumerChainId,
    providerChainId,
    tokenName,
    joinName,
    requestId,
    timestamp = Date.now()
  }) => ({
    type: actionTypes.COMPLETE_AUTHENTICATION,
    payload: {
      oAuthProvider,
      consumerChainId,
      providerChainId,
      tokenName,
      joinName,
      requestId,
      timestamp
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
