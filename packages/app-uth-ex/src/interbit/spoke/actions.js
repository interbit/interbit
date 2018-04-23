const actionTypes = {
  CHAIN_METADATA: 'underTheHood/spoke/CHAIN_METADATA',
  PRIVATE_TOKEN: 'underTheHood/spoke/PRIVATE_TOKEN',
  REQUEST_TOKEN: 'underTheHood/spoke/REQUEST_TOKEN',
  MOUNT_TOKEN: 'underTheHood/spoke/MOUNT_TOKEN'
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

  requestToken: ({ tokenName, providerChainId, justification }) => ({
    type: actionTypes.REQUEST_TOKEN,
    payload: {
      tokenName,
      providerChainId,
      justification
    }
  }),

  mountToken: ({
    tokenName,
    providerChainId,
    joinName,
    consumerRequestId
  }) => ({
    type: actionTypes.MOUNT_TOKEN,
    payload: {
      tokenName,
      providerChainId,
      joinName,
      consumerRequestId
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
