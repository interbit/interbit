const actionTypes = {
  CHAIN_METADATA: 'underTheHood/hub/CHAIN_METADATA',
  PRIVATE_TOKEN: 'underTheHood/hub/PRIVATE_TOKEN',
  SHAREABLE_TOKEN: 'underTheHood/hub/SHAREABLE_TOKEN',
  TOKEN_REQUEST: 'underTheHood/hub/TOKEN_REQUEST',
  APPROVE_TOKEN_REQUEST: 'underTheHood/hub/APPROVE_TOKEN_REQUEST',
  DENY_TOKEN_REQUEST: 'underTheHood/hub/DENY_TOKEN_REQUEST',
  REVOKE_TOKEN: 'underTheHood/hub/REVOKE_TOKEN'
}

const actionCreators = {
  chainMetadata: ({ chainName }) => ({
    type: actionTypes.CHAIN_METADATA,
    payload: {
      chainName
    }
  }),

  privateToken: ({ tokenName, value }) => ({
    type: actionTypes.PRIVATE_TOKEN,
    payload: {
      tokenName,
      value
    }
  }),

  sharableToken: ({ tokenName, value }) => ({
    type: actionTypes.SHAREABLE_TOKEN,
    payload: {
      tokenName,
      value
    }
  }),

  tokenRequest: ({
    consumerChainId,
    consumerRequestId,
    tokenName,
    justification
  }) => ({
    type: actionTypes.TOKEN_REQUEST,
    payload: {
      consumerChainId,
      consumerRequestId,
      tokenName,
      justification
    }
  }),

  approveTokenRequest: ({ requestId }) => ({
    type: actionTypes.APPROVE_TOKEN_REQUEST,
    payload: {
      requestId
    }
  }),

  denyTokenRequest: ({ requestId }) => ({
    type: actionTypes.DENY_TOKEN_REQUEST,
    payload: {
      requestId
    }
  }),

  revokeToken: ({ requestId }) => ({
    type: actionTypes.REVOKE_TOKEN,
    payload: {
      requestId
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
