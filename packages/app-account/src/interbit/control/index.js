// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { rootCovenant } = require('interbit-covenant-tools')
const Immutable = require('seamless-immutable')

const {
  CHAIN_ALIASES: { PRIVATE },
  COVENANTS: { MY_ACCOUNT }
} = require('./constants')

const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  chainMetadata: {
    chainName: 'Account Control Chain'
  },
  privateChainHosting: {}
})

const reducer = (state = initialState, action) => {
  const nextState = rootCovenant.reducer(state, action)
  if (action.type.endsWith('STROBE')) {
    return nextState
  }

  switch (action.type) {
    case rootCovenant.actionTypes.SET_MANIFEST: {
      const { manifest } = action.payload
      const covenantHash = getCovenantHash(MY_ACCOUNT, manifest)

      return nextState.setIn(['privateChainHosting', 'shared', PRIVATE], {
        blockMaster: nextState.getIn(['interbit', 'config', 'blockMaster']),
        sponsorChainId: nextState.getIn(['interbit', 'chainId']),
        covenantHash
      })
    }

    default:
      return nextState
  }
}

const getCovenantHash = (covenantAlias, manifest) => {
  if (!manifest.covenants) {
    return undefined
  }

  const covenant = manifest.covenants[covenantAlias]
  if (typeof covenant === 'string') {
    return covenant
  }

  return covenant.hash
}

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
