const spokeCovenant = require('../interbit/spoke/actions')

const covenantName = 'Interbit Under-the-Hood token consumer'
const privateTokenName = 'My age'
const providerTokenName = 'Favourite colour'
const chainNameLabel = 'Chain name'
const justificationLabel = 'Justification'

const actionCreators = hubChainId => ({
  // Public actions that can be invoked by clients
  chainMetadata: () => ({
    type: 'Give the chain a name',
    arguments: {
      [chainNameLabel]: 'Enter chain name'
    },
    invoke: ({ [chainNameLabel]: chainName }) =>
      spokeCovenant.actionCreators.chainMetadata({ chainName })
  }),

  privateToken: () => ({
    type: `Update '${privateTokenName}' private token`,
    explanation: 'Private token that will never be shared',
    arguments: {
      [privateTokenName]: 'Enter private token'
    },
    invoke: ({ [privateTokenName]: value }) =>
      spokeCovenant.actionCreators.privateToken({
        tokenName: privateTokenName,
        value
      })
  }),

  requestToken: () => ({
    type: `Request '${providerTokenName}' token from hub`,
    explanation: 'Forward a token request to the hub chain',
    arguments: {
      [justificationLabel]: ''
    },
    invoke: ({ [justificationLabel]: justification }) =>
      spokeCovenant.actionCreators.requestToken({
        providerChainId: hubChainId,
        tokenName: providerTokenName,
        justification
      })
  })
})

module.exports = {
  covenantName,
  actionCreators
}
