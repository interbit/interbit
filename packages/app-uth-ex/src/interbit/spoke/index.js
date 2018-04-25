// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const {
  coreCovenant: {
    redispatch,
    remoteRedispatch,
    actionCreators: { startConsumeState }
  }
} = require('interbit-covenant-tools')

const { actionCreators: hubActionCreators } = require('../hub/actions')
const { actionTypes, actionCreators } = require('./actions')

const initialState = Immutable.from({
  chainMetadata: {
    covenant: 'Interbit Under-the-Hood token consumer'
  },
  privateTokens: {},
  tokenRequests: {},
  providerTokens: {}
})

const smartContract = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  let nextState = state

  switch (action.type) {
    case actionTypes.CHAIN_METADATA: {
      console.log('DISPATCH: ', action)
      const { chainName } = action.payload
      return nextState.setIn(['chainMetadata', 'chainName'], chainName)
    }

    case actionTypes.PRIVATE_TOKEN: {
      console.log('DISPATCH: ', action)
      const { tokenName, value } = action.payload
      return nextState.setIn(['privateTokens', tokenName], value)
    }

    case actionTypes.REQUEST_TOKEN: {
      console.log('DISPATCH: ', action)
      const { providerChainId, tokenName, justification } = action.payload

      const consumerRequestId = generateRequestId({
        providerChainId,
        tokenName
      })

      const actionToForward = hubActionCreators.tokenRequest({
        consumerChainId: state.interbit.chainId,
        consumerRequestId,
        tokenName,
        justification
      })

      console.log('REMOTE DISPATCH: ', actionToForward)
      nextState = remoteRedispatch(nextState, providerChainId, actionToForward)

      return nextState.setIn(['tokenRequests', consumerRequestId], {
        providerChainId,
        tokenName
      })
    }

    case actionTypes.MOUNT_TOKEN: {
      console.log('DISPATCH: ', action)
      const {
        tokenName,
        providerChainId,
        joinName,
        consumerRequestId
      } = action.payload

      const consumeAction = startConsumeState({
        provider: providerChainId,
        mount: ['providerTokens', tokenName],
        joinName
      })

      console.log('REDISPATCH: ', consumeAction)
      nextState = redispatch(nextState, consumeAction)

      return nextState.updateIn(
        ['tokenRequests'],
        Immutable.without,
        consumerRequestId
      )
    }

    default:
      return nextState
  }
}

const generateRequestId = ({ providerChainId, tokenName }) =>
  `${providerChainId.substr(0, 8)}/${tokenName.replace(/\s/g, '')}`

module.exports = {
  initialState,
  actionCreators,
  smartContract,
  reducer: smartContract
}
