const covenantName = 'app-account-public'

const actionTypes = {
  OAUTH_SIGN_IN: `${covenantName}/OAUTH_SIGN_IN`,
  OAUTH_SIGN_OUT: `${covenantName}/OAUTH_SIGN_OUT`
}

const actionCreators = {
  oAuthSignIn: ({
    oAuthProvider,
    consumerChainId,
    requestId,
    joinName,
    temporaryToken
  }) => ({
    type: actionTypes.OAUTH_SIGN_IN,
    payload: {
      oAuthProvider,
      consumerChainId,
      requestId,
      joinName,
      temporaryToken
    }
  }),

  oAuthSignOut: ({ oAuthProvider, consumerChainId }) => ({
    type: actionTypes.SIGN_OUT,
    payload: {
      oAuthProvider,
      consumerChainId
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
