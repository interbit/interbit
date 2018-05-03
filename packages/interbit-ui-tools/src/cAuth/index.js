const queryString = require('query-string')

const {
  getPublicChainId,
  getPrivateChainId,
  getPublicKey
} = require('../selectors')

const parseState = state => JSON.parse(Buffer.from(state, 'base64'))

const packState = state => Buffer.from(JSON.stringify(state)).toString('base64')

const requestParams = (
  state,
  { privateChainAlias, tokens = [], redirectUrl = window.location.href }
) => {
  const params = {
    redirectUrl,
    chainId: getPrivateChainId(state, { privateChainAlias }),
    tokens
  }

  return queryString.stringify(params)
}

const parseRequestParams = query => queryString.parse(query)

const cAuthRequestParams = (
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
      chainId: getPublicChainId(state, { publicChainAlias })
    },
    appConsumer: {
      chainAlias: privateChainAlias,
      chainId: getPrivateChainId(state, { privateChainAlias })
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

const parseCAuthRequestParams = query => {
  const { redirectUrl, state } = queryString.parse(query)
  return { redirectUrl, ...parseState(state) }
}

module.exports = {
  parseState,
  packState,
  requestParams,
  parseRequestParams,
  cAuthRequestParams,
  parseCAuthRequestParams
}
