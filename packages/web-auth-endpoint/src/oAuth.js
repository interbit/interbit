// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const queryString = require('query-string')

const {
  githubOAuthCovenant: { actionTypes, actionCreators, selectors }
} = require('app-account')

const waitForOAuth = async (
  githubChain,
  { requestId, consumerChainId, temporaryToken, error, errorDescription }
) => {
  // Trigger the oAuth saga
  const action = actionCreators.oAuthCallback({
    requestId,
    consumerChainId,
    temporaryToken,
    error,
    errorDescription
  })
  githubChain.dispatch(action)

  const redirectUrl = await waitForFinalSagaAction(
    githubChain,
    isOAuthCompleted(requestId),
    oAuthCompleted(requestId),
    oAuthTimeout(requestId)
  )
  return redirectUrl
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
  const rootUrl = selectors.callbackUrl(state)
  const failedParams = queryString.stringify({ requestId, error: 'timeout' })
  return `${rootUrl}?${failedParams}`
}

const oAuthCompleted = requestId => (state, block) => {
  const {
    content: { actions }
  } = block
  const action = actions.find(isResolvingAction(requestId))
  const rootUrl = selectors.callbackUrl(state)

  if (!action || !action.payload) {
    return `${rootUrl}?requestId=${requestId}&error=no-action`
  }

  const { joinName, error } = action.payload

  if (action.type === actionTypes.AUTH_FAILED) {
    const failedParams = queryString.stringify({ requestId, error })
    return `${rootUrl}?${failedParams}`
  }

  const providerChainId = state.getIn(['interbit', 'chainId'])
  const successParams = queryString.stringify({
    requestId,
    providerChainId,
    joinName
  })
  return `${rootUrl}?${successParams}`
}

const waitForFinalSagaAction = (
  chain,
  predicate,
  resolveFunction,
  timeoutFunction,
  maxTime = 5000
) =>
  new Promise((resolve, reject) => {
    let state
    let block

    const tester = () => {
      state = chain.getState()
      block = chain.getCurrentBlock()
      return predicate(state, block)
    }

    if (tester()) {
      resolve(resolveFunction(state, block))
      return
    }

    let unsubscribe = () => {}

    const timeout = timeoutFunction
      ? setTimeout(() => {
          reject(timeoutFunction(state, block))
          unsubscribe()
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

module.exports = waitForOAuth
