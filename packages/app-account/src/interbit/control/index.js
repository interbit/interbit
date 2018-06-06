// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  rootCovenant,
  coreCovenant: {
    remoteRedispatch,
    actionCreators: { addToAcl }
  }
} = require('interbit-covenant-tools')
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
  let nextState = rootCovenant.reducer(state, action)
  if (action.type.endsWith('STROBE')) {
    return nextState
  }

  switch (action.type) {
    case rootCovenant.actionTypes.SET_MANIFEST: {
      console.log('DISPATCH: ', action)

      const { manifest } = action.payload
      const covenantHash = getCovenantHash(MY_ACCOUNT, manifest)

      nextState = nextState.setIn(['privateChainHosting', 'shared', PRIVATE], {
        blockMaster: nextState.getIn(['interbit', 'config', 'blockMaster']),
        sponsorChainId: nextState.getIn(['interbit', 'chainId']),
        covenantHash
      })

      return nextState
    }

    case actionTypes.ADD_KEY_TO_SPONSORED_CHAIN: {
      console.log('DISPATCH: ', action)

      const {
        sponsoredChainId,
        role,
        authorizedActions,
        publicKey
      } = action.payload

      const actionToForward = addToAcl({
        actionPermissions: { [authorizedActions]: [role] },
        roles: { [role]: [publicKey] }
      })

      console.log('REMOTE DISPATCH: ', actionToForward)
      nextState = remoteRedispatch(nextState, sponsoredChainId, actionToForward)

      return nextState
    }

    default: {
      console.log('NOT HANDLED: ', action)
      return nextState
    }
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
