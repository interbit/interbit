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
      const { covenants } = action.payload.manifest
      const covenantHash = covenants[MY_ACCOUNT]

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

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
