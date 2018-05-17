// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  rootCovenant,
  coreCovenant: {
    actionCreators: { addToAcl },
    redispatch
  }
} = require('interbit-covenant-tools')
const Immutable = require('seamless-immutable')

const { CHAIN_ALIASES, COVENANTS } = require('./constants')

const actionTypes = {
  MEOW: 'MEOW'
}

const actionCreators = {
  meow: whoMeowed => ({
    type: actionTypes.MEOW,
    payload: {
      whoMeowed
    }
  })
}

const initialState = Immutable.from({
  // Not required but handy for troubleshooting
  chainMetadata: { chainName: `Template application - control chain` },

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
      },
      // Required for deployment
      projects: {
        serviceEndpoint:
          process.env.INTERBIT_PROJECTS_URL || 'http://localhost:3035'
      }
    }
  },

  // Information required for creating private chains using the
  // Public/Private/Control (PPC) model
  privateChainHosting: {},
  cats: {}
})

const reducer = (state = initialState, action) => {
  const nextState = rootCovenant.reducer(state, action)
  if (action.type.endsWith('STROBE')) {
    return nextState
  }

  switch (action.type) {
    case '@@interbit/SPONSOR_CHAIN_REQUEST': {
      console.log('CONTROL CHAIN ACTION')
      console.log(JSON.stringify(action.type, null, 2))

      const rootKeys =
        action.payload.genesisBlock.content.state.interbit.config.acl.roles.root
      const blockMaster = state.interbit.config.blockMaster

      const [privateChainPublicKey] = rootKeys.filter(
        key => key !== blockMaster
      )

      console.log(JSON.stringify(rootKeys))
      console.log(privateChainPublicKey)

      const addToAclAction = addToAcl({
        actionPermissions: {
          [actionTypes.MEOW]: 'coolcats'
        },
        roles: { coolcats: [privateChainPublicKey] }
      })

      return redispatch(nextState, addToAclAction)
    }

    case actionTypes.MEOW: {
      const { whoMeowed } = action.payload
      const numberOfMeows = state.cats[whoMeowed] || 0
      return nextState.setIn(['cats', whoMeowed], numberOfMeows + 1)
    }

    case rootCovenant.actionTypes.SET_MANIFEST: {
      const { manifest } = action.payload
      const covenantHash = getCovenantHash(COVENANTS.PRIVATE, manifest)

      return nextState.setIn(
        ['privateChainHosting', 'shared', CHAIN_ALIASES.PRIVATE],
        {
          blockMaster: nextState.getIn(['interbit', 'config', 'blockMaster']),
          sponsorChainId: nextState.getIn(['interbit', 'chainId']),
          covenantHash
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
