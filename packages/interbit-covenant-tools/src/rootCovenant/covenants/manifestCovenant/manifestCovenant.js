const Immutable = require('seamless-immutable')

const hashObject = require('../../hash')
const { remoteRedispatch } = require('../../../coreCovenant')
const { PATHS } = require('../../constants')
const { applyJoinChanges } = require('./applyJoinChanges')
const { applyCovenantChanges } = require('./applyCovenantChanges')
const { applyAclChanges } = require('./applyAclChanges')

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

const applyChanges = (state, newManifest) => {
  let nextState = state

  nextState = applyCovenantChanges(nextState, newManifest)
  nextState = applyAclChanges(nextState, newManifest)
  nextState = applyJoinChanges(nextState, newManifest)

  return nextState
}

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
