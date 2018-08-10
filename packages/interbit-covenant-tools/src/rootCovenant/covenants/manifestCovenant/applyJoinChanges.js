const _ = require('lodash')
const {
  startConsumeState,
  startProvideState,
  authorizeReceiveActions,
  authorizeSendActions
} = require('interbit-covenant-utils')
const {
  redispatch,
  actionTypes: coreActionTypes
} = require('../../../coreCovenant')
const {
  stopConsumeState,
  stopProvideState,
  revokeSendActions,
  revokeReceiveActions
} = require('../../../coreCovenant/helpers/revokeJoin')
const { JOIN_TYPES } = require('../../../constants')

const applyJoinChanges = (state, newManifest) => {
  let nextState = state

  const newJoinActions = manifestJoinsToActions(newManifest)
  if (!state.manifest) {
    for (const joinAction of newJoinActions) {
      nextState = redispatch(nextState, joinAction)
    }

    return nextState
  }

  const currManifest = !state.manifest.chainId
    ? Object.values(state.manifest.manifest)[0]
    : state.manifest

  const currJoinActions = manifestJoinsToActions(currManifest)

  const removedJoinActions = currJoinActions.filter(
    currJoin => !newJoinActions.some(newJoin => _.isEqual(currJoin, newJoin))
  )
  for (const joinAction of removedJoinActions) {
    switch (joinAction.type) {
      case coreActionTypes.AUTHORIZE_RECEIVE_ACTIONS: {
        const { permittedActions, senderChainId } = joinAction.payload
        for (const permittedAction of permittedActions) {
          nextState = revokeReceiveActions(
            nextState,
            senderChainId,
            permittedAction
          )
        }
        break
      }

      case coreActionTypes.AUTHORIZE_SEND_ACTIONS: {
        const { receiverChainId } = joinAction.payload
        nextState = revokeSendActions(nextState, receiverChainId)
        break
      }

      case coreActionTypes.START_PROVIDE_STATE: {
        const { joinName } = joinAction.payload
        nextState = stopProvideState(nextState, joinName)
        break
      }

      case coreActionTypes.START_CONSUME_STATE: {
        const { joinName } = joinAction.payload
        nextState = stopConsumeState(nextState, joinName)
        break
      }

      default:
        break
    }
  }

  const addedJoinActions = newJoinActions.filter(
    newJoin => !currJoinActions.some(currJoin => _.isEqual(newJoin, currJoin))
  )
  for (const joinAction of addedJoinActions) {
    nextState = redispatch(nextState, joinAction)
  }

  return nextState
}

const manifestJoinsToActions = manifest => {
  const consume = configureConsume(manifest)
  const provide = configureProvide(manifest)
  const send = configureSend(manifest)
  const receive = configureReceive(manifest)

  return [...consume, ...provide, ...send, ...receive]
}

const configureConsume = manifest => {
  const consume = manifest.joins[JOIN_TYPES.CONSUME]
  if (!Array.isArray(consume)) {
    return []
  }
  return consume.reduce(
    (prev, { alias: joinedChainAlias, path: mount, joinName }) => {
      const provider = manifest.chainIds[joinedChainAlias]
      const consumeAction = startConsumeState({
        provider,
        mount,
        joinName
      })
      return prev.concat(consumeAction)
    },
    []
  )
}

const configureProvide = manifest => {
  const provide = manifest.joins[JOIN_TYPES.PROVIDE]
  if (!Array.isArray(provide)) {
    return []
  }
  return provide.reduce(
    (prev, { alias: joinedChainAlias, path: statePath, joinName }) => {
      const consumer = manifest.chainIds[joinedChainAlias]
      const provideAction = startProvideState({
        consumer,
        statePath,
        joinName
      })
      return prev.concat(provideAction)
    },
    []
  )
}

const configureReceive = manifest => {
  const receive = manifest.joins[JOIN_TYPES.RECEIVE]
  if (!Array.isArray(receive)) {
    return []
  }
  return receive.reduce(
    (
      prev,
      { alias: joinedChainAlias, authorizedActions: permittedActions }
    ) => {
      console.log(manifest.chainIds)
      const senderChainId = manifest.chainIds[joinedChainAlias]
      const receiveAction = authorizeReceiveActions({
        senderChainId,
        permittedActions
      })
      return prev.concat(receiveAction)
    },
    []
  )
}

const configureSend = manifest => {
  const send = manifest.joins[JOIN_TYPES.SEND]
  if (!Array.isArray(send)) {
    return []
  }
  return send.reduce((prev, { alias: joinedChainAlias }) => {
    const receiverChainId = manifest.chainIds[joinedChainAlias]
    const sendAction = authorizeSendActions({
      receiverChainId
    })
    return prev.concat(sendAction)
  }, [])
}

module.exports = { applyJoinChanges }
