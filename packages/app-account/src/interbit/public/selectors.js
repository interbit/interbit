const getOAuthConfig = state => state.getIn(['identityProviders', 'oauth'])

const getOAuthProviderConfig = (state, oAuthProvider) =>
  state.getIn(['identityProviders', 'oauth', oAuthProvider])

module.exports = {
  getOAuthConfig,
  getOAuthProviderConfig
}
