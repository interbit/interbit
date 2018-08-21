const queryString = require('query-string')
const base64url = require('base64-url')

const { getChainId, getPublicKey } = require('../middleware/selectors')

const packState = (state = '', whiteList) =>
  base64url.encode(JSON.stringify(state, whiteList))

const packCAuthParams = (
  state,
  {
    publicChainAlias,
    privateChainAlias,
    tokens = [],
    redirectUrl = window.location.href
  }
) => {
  const requestState = {
    appPublic: {
      chainAlias: publicChainAlias,
      chainId: getChainId(state, { chainAlias: publicChainAlias })
    },
    appConsumer: {
      chainAlias: privateChainAlias,
      chainId: getChainId(state, { chainAlias: privateChainAlias })
    },
    publicKey: getPublicKey,
    tokens
  }

  const params = {
    redirectUrl,
    state: packState(requestState)
  }

  return queryString.stringify(params)
}

const parseState = state => JSON.parse(base64url.decode(state))

const parseCAuthParams = query => {
  const { redirectUrl, state } = queryString.parse(query)
  return { redirectUrl, ...parseState(state) }
}

module.exports = {
  packState,
  parseState,
  packCAuthParams,
  parseCAuthParams
}
