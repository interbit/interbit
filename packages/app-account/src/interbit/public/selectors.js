const getOAuthConfig = state => state.getIn(['identityProviders', 'oauth'])

const getOAuthProviderConfig = (state, oAuthProvider) =>
  state.getIn(['identityProviders', 'oauth', oAuthProvider])

const getOAuthProviderChainId = (state, oAuthProvider) => {
  const providers = state.getIn(['interbit', 'config', 'consuming'])
  const configProvider = providers.find(
    provider =>
      Array.isArray(provider.mount) &&
      provider.mount.join(',') === `identityProviders,oauth,${oAuthProvider}`
  )
  const chainId = configProvider.provider
  if (!chainId) {
    throw new Error(`Unknown oAuth provider chain ${oAuthProvider}`)
  }

  return chainId
}

module.exports = {
  getOAuthConfig,
  getOAuthProviderConfig,
  getOAuthProviderChainId
}
