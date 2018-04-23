const getChainState = state => {
  if (!state.chains) {
    return false
  }

  const chainId = Object.keys(state.chains)[0]

  if (!state.chains[chainId]) {
    return false
  }

  return state.chains[chainId]
}

export default state => {
  const chainState = getChainState(state)

  return chainState && chainState.app.dns
    ? chainState.app.dns.interbitServices
    : {}
}
