const Immutable = require('seamless-immutable')
const objectHash = require('object-hash')
const { remoteRedispatch } = require('../coreCovenant')
const { PATHS } = require('./constants')

const prefix = '@@MANIFEST'

const actionTypes = {
  SET_MANIFEST: `${prefix}/SET_MANIFEST`
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
      console.log(manifest.hash)
      if (!verifyManifestHash(manifest)) {
        return nextState
      }

      const chainAlias = getOwnChainAlias(manifest)
      nextState = redispatchManifest(state, manifest[chainAlias])
      return nextState.setIn(PATHS.MANIFEST, manifest)
    }

    default:
      return state
  }
}

const verifyManifestHash = manifest => {
  const verifiableManifest = { ...manifest }
  delete verifiableManifest.hash
  const hash = objectHash(verifiableManifest)

  // const hash = manifest.hash
  // delete manifest.hash
  // const compareHash = objectHash(manifest)

  // console.log(compareHash)
  console.log(hash)
  console.log(manifest.hash)
  return hash === manifest.hash
}

const getOwnChainAlias = manifest => Object.keys(manifest)[0]

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

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
