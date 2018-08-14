const {
  redispatch,
  selectors: { covenantHash },
  actionCreators: { applyCovenant }
} = require('../../../coreCovenant')

const applyCovenantChanges = (state, newManifest) => {
  let nextState = state

  const currCovenantHash = covenantHash(state)
  const newCovenantHash = newManifest.covenantHashMap[newManifest.covenant]
  const isCovenantAliasChanged = newCovenantHash !== currCovenantHash

  if (isCovenantAliasChanged) {
    const applyCovenantAction = applyCovenant({ covenantHash: newCovenantHash })
    nextState = redispatch(nextState, applyCovenantAction)
  }

  return nextState
}

module.exports = { applyCovenantChanges }
