const accountsPrivate = require('../interbit/my-account/actions')

const aliasLabel = 'Nickname or alias'
const nameLabel = 'Name'
const emailLabel = 'Email address'
const consumerChainIdLabel = 'Consumer chain ID'
const providerChainIdLabel = 'Provider chain ID'
const sharedTokensLabel = 'Share tokens'

export const covenantName = accountsPrivate.covenantName

export const actionCreators = {
  updateProfile: () => ({
    type: 'Update user profile',
    arguments: {
      [aliasLabel]: '',
      [nameLabel]: '',
      [emailLabel]: ''
    },
    invoke: ({ [aliasLabel]: alias, [nameLabel]: name, [emailLabel]: email }) =>
      accountsPrivate.actionCreators.updateProfile({ alias, name, email })
  }),

  shareProfileTokens: () => ({
    type: 'Authorize token sharing with consumer',
    arguments: {
      [providerChainIdLabel]: '',
      [consumerChainIdLabel]: '',
      [sharedTokensLabel]: ''
    },
    invoke: ({
      [providerChainIdLabel]: providerChainId,
      [consumerChainIdLabel]: consumerChainId,
      [sharedTokensLabel]: sharedTokens
    }) =>
      accountsPrivate.actionCreators.shareProfileTokens({
        providerChainId,
        consumerChainId,
        sharedTokens: sharedTokens.split(',')
      })
  }),

  stopSharing: () => ({
    type: 'Stop token sharing with consumer',
    arguments: {
      [consumerChainIdLabel]: ''
    },
    invoke: ({ [consumerChainIdLabel]: consumerChainId }) =>
      accountsPrivate.actionCreators.stopSharing({ consumerChainId })
  })
}
