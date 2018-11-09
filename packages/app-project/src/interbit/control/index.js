// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  rootCovenant,
  coreCovenant: {
    selectors: { chainId, config }
  }
} = require('interbit-covenant-tools')
const Immutable = require('seamless-immutable')

const { CHAIN_ALIASES, COVENANTS } = require('./constants')

const actionTypes = {}

const actionCreators = {}

const initialState = Immutable.from({
  // Where to find required Interbit services
  // For security, this information is maintained in the control chain and
  // shared via a read join to the public chain
  interbitServices: {
    // Using shared as a marker to indicate data shared with other chains
    shared: {
      // Required for cAuth
      accounts: {
        serviceEndpoint:
          process.env.INTERBIT_ACCOUNTS_URL || 'http://localhost:3025'
      }
    }
  },

  // Information required for creating private chains using the
  // Public/Private/Control (PPC) model
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

      const { blockMaster } = config(nextState)

      return nextState
        .setIn(['privateChainHosting', 'shared', CHAIN_ALIASES.PRIVATE], {
          blockMaster,
          sponsorChainId: chainId(nextState),
          covenantHash: getCovenantHash(COVENANTS.PRIVATE, manifest)
        })
        .setIn(
          ['privateChainHosting', 'shared', CHAIN_ALIASES.PRIVATE_PROJECT],
          {
            blockMaster,
            sponsorChainId: chainId(nextState),
            covenantHash: getCovenantHash(COVENANTS.PRIVATE_PROJECT, manifest)
          }
        )
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
