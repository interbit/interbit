const {
  providing: getProviding,
  consuming: getConsuming
} = require('../selectors')
const { PATHS } = require('../constants')
const { cleanupAcl } = require('./revokeWriteJoin')

const revokeReadJoin = (state, joinName) => {
  let nextState = state

  const chainId = getChainIdForJoinName(state, joinName)
  if (!chainId) {
    return nextState
  }

  nextState = removeJoinByName(nextState, joinName)
  nextState = cleanupAcl(nextState, chainId)

  return nextState
}

const getChainIdForJoinName = (state, joinName) => {
  const providing = getProviding(state)

  const providingJoin = providing.find(join => join.joinName === joinName)
  if (providingJoin) {
    return providingJoin.consumer
  }

  const consuming = getConsuming(state)
  const consumingJoin = consuming.find(join => join.joinName === joinName)
  if (consumingJoin) {
    return consumingJoin.provider
  }

  return undefined
}

const removeJoinByName = (state, joinName) => {
  const providing = getProviding(state)
  const consuming = getConsuming(state)

  return state
    .setIn(
      PATHS.PROVIDING,
      providing.filter(join => join.joinName !== joinName)
    )
    .setIn(
      PATHS.CONSUMING,
      consuming.filter(join => join.joinName !== joinName)
    )
}

module.exports = revokeReadJoin
