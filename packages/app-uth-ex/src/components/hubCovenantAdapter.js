const hubCovenant = require('../interbit/hub/actions')

const covenantName = 'Interbit Under-the-Hood token provider'
const privateTokenName = 'My age'
const sharableTokenName = 'Favourite colour'
const chainNameLabel = 'Chain name'
const requestIdLabel = 'Request ID'

const actionCreators = {
  // Public actions that can be invoked by clients
  chainMetadata: () => ({
    type: 'Give the chain a name',
    arguments: {
      [chainNameLabel]: 'Enter chain name'
    },
    invoke: ({ [chainNameLabel]: chainName }) =>
      hubCovenant.actionCreators.chainMetadata({ chainName })
  }),

  privateToken: () => ({
    type: `Update '${privateTokenName}' private token`,
    explanation: 'Private token that will never be shared',
    arguments: {
      [privateTokenName]: 'Enter private token'
    },
    invoke: ({ [privateTokenName]: value }) =>
      hubCovenant.actionCreators.privateToken({
        tokenName: privateTokenName,
        value
      })
  }),

  sharableToken: () => ({
    type: `Update '${sharableTokenName}' shareable token`,
    explanation: 'Token that will be shared with authorized chains',
    arguments: {
      [sharableTokenName]: 'Enter sharable token'
    },
    invoke: ({ [sharableTokenName]: value }) =>
      hubCovenant.actionCreators.sharableToken({
        tokenName: sharableTokenName,
        value
      })
  }),

  approveTokenRequest: () => ({
    type: `Authorize request to access '${sharableTokenName}'`,
    arguments: {
      [requestIdLabel]: ''
    },
    invoke: ({ [requestIdLabel]: requestId }) =>
      hubCovenant.actionCreators.approveTokenRequest({
        requestId
      })
  }),

  denyTokenRequest: () => ({
    type: `Deny request to access '${sharableTokenName}'`,
    arguments: {
      [requestIdLabel]: ''
    },
    invoke: ({ [requestIdLabel]: requestId }) =>
      hubCovenant.actionCreators.denyTokenRequest({
        requestId
      })
  }),

  revokeToken: () => ({
    type: `Revoke access to '${sharableTokenName}'`,
    arguments: {
      [requestIdLabel]: ''
    },
    invoke: ({ [requestIdLabel]: requestId }) =>
      hubCovenant.actionCreators.revokeToken({
        requestId
      })
  })
}

module.exports = {
  covenantName,
  actionCreators
}
