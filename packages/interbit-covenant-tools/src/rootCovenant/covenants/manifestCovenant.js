const Immutable = require('seamless-immutable')
const _ = require('lodash')
const {
  startConsumeState,
  startProvideState,
  authorizeReceiveActions,
  authorizeSendActions
} = require('interbit-covenant-utils')

const hashObject = require('../hash')
const {
  remoteRedispatch,
  redispatch,
  selectors: { covenantHash },
  actionCreators: { applyCovenant },
  actionTypes: coreActionTypes
} = require('../../coreCovenant')
const {
  stopConsumeState,
  stopProvideState,
  revokeSendActions,
  revokeReceiveActions
} = require('../../coreCovenant/helpers/revokeJoin')
const { JOIN_TYPES } = require('../../constants')
const { PATHS } = require('../constants')

const PREFIX = '@@MANIFEST'

const actionTypes = {
  SET_MANIFEST: `${PREFIX}/SET_MANIFEST`
}

const actionCreators = {
  setManifest: manifest => ({
    type: actionTypes.SET_MANIFEST,
    payload: {
      manifest
    }
  })
}

const initialState = Immutable.from({}).setIn(PATHS.MANIFEST, {})

const reducer = (state = initialState, action) => {
  let nextState = state

  switch (action.type) {
    case actionTypes.SET_MANIFEST: {
      const { manifest } = action.payload

      // chainId property is only available within subtree manifests, whereas the
      // root receives ALL manifests, and doesn't have chainId at the top lvl
      const isRootChain = !manifest.chainId

      if (isRootChain && !verifyManifestHash(manifest)) {
        return nextState
      }

      const ownManifest = isRootChain
        ? Object.values(manifest.manifest)[0]
        : manifest

      const isManifestOwn = ownManifest.chainId === state.interbit.chainId
      if (!isManifestOwn) {
        throw new Error('This chain is not a part of the manifest')
      }

      if (!verifyManifestHash(ownManifest)) {
        return nextState
      }

      nextState = redispatchManifest(state, ownManifest)
      nextState = applyChanges(nextState, ownManifest)

      return nextState.setIn(PATHS.MANIFEST, manifest)
    }

    default:
      return state
  }
}

const applyChanges = (state, newManifest) => {
  let nextState = state

  nextState = applyCovenantChanges(nextState, newManifest)
  nextState = applyAclChanges(nextState, newManifest)
  nextState = applyJoinChanges(nextState, newManifest)

  return nextState
}

const applyCovenantChanges = (state, newManifest) => {
  let nextState = state

  const currCovenantHash = covenantHash(state)
  const newCovenantHash = newManifest.covenants[newManifest.covenant]
  const isCovenantAliasChanged = newCovenantHash !== currCovenantHash

  if (isCovenantAliasChanged) {
    const applyCovenantAction = applyCovenant({ covenantHash: newCovenantHash })
    nextState = redispatch(nextState, applyCovenantAction)
  }

  return nextState
}

const applyAclChanges = (state, newManifest) => {
  const nextState = state

  // It hasn't been totally decided how we will manage ACL updates in the
  // manifest.

  return nextState
}

const applyJoinChanges = (state, newManifest) => {
  let nextState = state

  const newJoinActions = manifestJoinsToActions(newManifest)
  console.log(newManifest.joins)
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
    console.log(joinAction)
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
        console.log(receiverChainId)
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

const verifyManifestHash = manifest => {
  const verifiableManifest = { ...manifest }
  delete verifiableManifest.hash
  const hash = hashObject(verifiableManifest)

  return hash === manifest.hash
}

const redispatchManifest = (state, manifestTree) => {
  let nextState = state
  const childEntries = Object.entries(manifestTree.chains)

  for (const [childAlias, childManifest] of childEntries) {
    const manifest = {
      [childAlias]: childManifest
    }
    const setManifestAction = actionCreators.setManifest(manifest)
    nextState = remoteRedispatch(
      nextState,
      childManifest.chainId,
      setManifestAction
    )
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
      // TODO: Don't assume we are the root for this selector...
      // This will fail setting joins for a child chain as the
      // child chains will not have the chains all loaded into their
      // chains prop.
      // TODO: Add the chainIDs of joined chains to the chains prop
      // of childchains in the manifest so they know who they join to
      const provider = manifest.chains[joinedChainAlias].chainId
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
      // TODO: Don't assume we are the root for this selector...
      // This will fail setting joins for a child chain
      const consumer = manifest.chains[joinedChainAlias].chainId
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
      // TODO: Don't assume we are the root for this selector...
      // This will fail setting joins for a child chain
      const senderChainId = manifest.chains[joinedChainAlias].chainId
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
    // TODO: Don't assume we are the root for this selector...
    // This will fail setting joins for a child chain
    const receiverChainId = manifest.chains[joinedChainAlias].chainId
    const sendAction = authorizeSendActions({
      receiverChainId
    })
    return prev.concat(sendAction)
  }, [])
}

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
