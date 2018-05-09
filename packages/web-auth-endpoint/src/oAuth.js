// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const queryString = require('query-string')

const {
  githubOAuthCovenant: { actionTypes, actionCreators, selectors }
} = require('app-account')

const waitForOAuth = async (
  githubChain,
  { requestId, consumerChainId, temporaryToken, error, errorDescription }
) => {
  try {
    // Trigger the oAuth saga
    const action = actionCreators.oAuthCallback({
      requestId,
      consumerChainId,
      temporaryToken,
      error,
      errorDescription
    })
    await githubChain.dispatch(action)

    const redirectUrl = await waitForFinalSagaAction(
      githubChain,
      isOAuthCompleted(requestId),
      oAuthCompleted(requestId),
      oAuthTimeout(requestId)
    )
    return redirectUrl
  } catch (e) {
    return getRedirectUrl(githubChain.getState(), {
      requestId,
      error: 'failed'
    })
  }
}

const getRedirectUrl = (state, params = {}) => {
  const rootUrl = selectors.callbackUrl(state)
  const urlParams = queryString.stringify(params)
  return urlParams ? `${rootUrl}?${urlParams}` : rootUrl
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

const oAuthTimeout = requestId => (state, block) =>
  getRedirectUrl(state, {
    requestId,
    error: 'timeout'
  })

const oAuthCompleted = requestId => (state, block) => {
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

  const { joinName, error } = action.payload

  if (action.type === actionTypes.AUTH_FAILED) {
    return getRedirectUrl(state, {
      requestId,
      error
    })
  }

  const providerChainId = state.getIn(['interbit', 'chainId'])
  return getRedirectUrl(state, {
    requestId,
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

module.exports = waitForOAuth
