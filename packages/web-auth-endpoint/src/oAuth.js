// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const queryString = require('query-string')
const {
  queryParams: { parseState }
} = require('interbit-ui-tools')

const {
  githubOAuthCovenant: { actionTypes, actionCreators, selectors }
} = require('app-account')

const waitForOAuth = async (
  githubChain,
  { requestId, state, temporaryToken, error, errorDescription }
) => {
  try {
    const { browserChainId, publicKey } = parseState(state)

    // Trigger the oAuth saga
    const action = actionCreators.oAuthCallback({
      requestId,
      publicKey,
      browserChainId,
      temporaryToken,
      error,
      errorDescription
    })

    console.log('waitForOAuth: DISPATCHING: ', action)
    githubChain.dispatch(action)

    const redirectUrl = await waitForFinalSagaAction(
      githubChain,
      isOAuthCompleted(requestId),
      oAuthCompleted(requestId),
      oAuthTimeout(requestId)
    )
    return redirectUrl
  } catch (e) {
    console.log('waitForOAuth: ERROR: ', e.message || e)
    return getRedirectUrl(githubChain.getState(), {
      requestId,
      error: 'failed'
    })
  }
}

const getRedirectUrl = (state, params = {}) => {
  const rootUrl = selectors.callbackUrl(state) || process.env.OAUTH_CALLBACK_URL
  const urlParams = queryString.stringify(params)
  const result = urlParams ? `${rootUrl}?${urlParams}` : rootUrl
  return result
}

const isResolvingAction = requestId => action => {
  const { type, payload = {} } = action
  return (
    payload.requestId === requestId &&
    (type === actionTypes.AUTH_SUCEEDED || type === actionTypes.AUTH_FAILED)
  )
}

const isOAuthCompleted = requestId => (state, block) => {
  const {
    content: { actions }
  } = block
  return actions.some(isResolvingAction(requestId))
}

const oAuthTimeout = requestId => (state, block) => {
  console.log('oAuthTimeout')
  return getRedirectUrl(state, {
    requestId,
    error: 'timeout'
  })
}

const oAuthCompleted = requestId => (state, block) => {
  console.log('oAuthCompleted')
  const {
    content: { actions }
  } = block
  const action = actions.find(isResolvingAction(requestId))

  if (!action || !action.payload) {
    return getRedirectUrl(state, {
      requestId,
      error: 'no-action'
    })
  }

  if (action.type === actionTypes.AUTH_FAILED) {
    const { error } = action.payload
    return getRedirectUrl(state, {
      requestId,
      error
    })
  }

  const {
    browserChainId,
    privateChainId,
    providerChainId,
    joinName
  } = action.payload

  return getRedirectUrl(state, {
    requestId,
    browserChainId,
    privateChainId,
    providerChainId,
    joinName
  })
}

const waitForFinalSagaAction = (
  chain,
  predicate,
  resolveFunction,
  timeoutFunction,
  maxTime = Number(process.env.OAUTH_TIMEOUT || 30000)
) => {
  console.log('waitForFinalSagaAction')

  return new Promise((resolve, reject) => {
    let state
    let block
    const emptyBlock = { content: { actions: [] } }

    const tester = () => {
      state = chain.getState()
      block = chain.getCurrentBlock() || emptyBlock
      return predicate(state, block)
    }

    if (tester()) {
      resolve(resolveFunction(state, block))
      return
    }

    let unsubscribe = () => {}

    const timeout = timeoutFunction
      ? setTimeout(() => {
          unsubscribe()
          resolve(timeoutFunction(state, block))
        }, maxTime)
      : undefined

    unsubscribe = chain.subscribe(() => {
      if (tester()) {
        unsubscribe()
        timeout && clearTimeout(timeout)
        resolve(resolveFunction(state, block))
      }
    })
  })
}

module.exports = waitForOAuth
