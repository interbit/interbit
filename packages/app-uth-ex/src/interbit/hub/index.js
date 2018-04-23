// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const utils = require('interbit-covenant-utils')
const { actionTypes, actionCreators } = require('./actions')
const { actionCreators: spokeActionCreators } = require('../spoke/actions')

const initialState = Immutable.from({
  chainMetadata: { covenant: 'Interbit Under-the-Hood token provider' },
  privateTokens: {},
  shareableTokens: {},
  tokenRequests: {},
  sharedTokens: {}
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

    case actionTypes.SHAREABLE_TOKEN: {
      console.log('DISPATCH: ', action)
      const { tokenName, value } = action.payload
      nextState = state.setIn(['shareableTokens', tokenName], value)

      return refreshSharedTokens(nextState, { tokenName, value })
    }

    case actionTypes.TOKEN_REQUEST: {
      console.log('DISPATCH: ', action)
      const {
        consumerChainId,
        consumerRequestId,
        tokenName,
        justification
      } = action.payload
      const requestId = generateRequestId({ consumerChainId, tokenName })
      return nextState.setIn(['tokenRequests', requestId], {
        consumerRequestId,
        consumerChainId,
        tokenName,
        justification
      })
    }

    case actionTypes.APPROVE_TOKEN_REQUEST: {
      console.log('DISPATCH: ', action)
      const { requestId } = action.payload
      const request = state.getIn(['tokenRequests', requestId])
      if (request) {
        const { tokenName, consumerChainId, consumerRequestId } = request

        nextState = makeTokenShareable(nextState, {
          requestId,
          tokenName,
          consumerChainId,
          consumerRequestId
        })

        const joinName = `TOKEN-${requestId}`

        const provideAction = utils.startProvideState({
          consumer: consumerChainId,
          statePath: ['sharedTokens', requestId],
          joinName
        })

        console.log('REDISPATCH: ', provideAction)
        nextState = utils.redispatch(nextState, provideAction)

        const actionToForward = spokeActionCreators.mountToken({
          consumerRequestId,
          tokenName,
          providerChainId: state.interbit.chainId,
          joinName
        })

        console.log('REMOTE DISPATCH: ', actionToForward)
        nextState = utils.remoteRedispatch(
          nextState,
          consumerChainId,
          actionToForward
        )

        return removeProcessedTokenRequest(nextState, { requestId })
      }
      return state
    }

    case actionTypes.DENY_TOKEN_REQUEST: {
      console.log('DISPATCH: ', action)
      const { requestId } = action.payload
      return removeProcessedTokenRequest(nextState, { requestId })
    }

    case actionTypes.REVOKE_TOKEN: {
      console.log('DISPATCH: ', action)
      const { requestId } = action.payload
      return removeRevokedToken(nextState, { requestId })
    }

    default:
      return nextState
  }
}

const generateRequestId = ({ consumerChainId, tokenName }) =>
  `${consumerChainId.substr(0, 8)}/${tokenName.replace(/\s/g, '')}`

const makeTokenShareable = (
  state,
  { requestId, tokenName, consumerChainId, consumerRequestId }
) => {
  const value = state.getIn(['shareableTokens', tokenName])
  const sharedPath = ['sharedTokens', requestId]
  return state.setIn(sharedPath, {
    consumerChainId,
    consumerRequestId,
    [tokenName]: value
  })
}

const removeProcessedTokenRequest = (state, { requestId }) =>
  state.updateIn(['tokenRequests'], Immutable.without, requestId)

const removeRevokedToken = (state, { requestId }) =>
  state.updateIn(['sharedTokens'], Immutable.without, requestId)

const refreshSharedTokens = (state, { tokenName, value }) =>
  tokenName
    ? Object.keys(state.sharedTokens || []).reduce((acc, requestId) => {
        const sharedPath = ['sharedTokens', requestId, tokenName]
        return acc.getIn(sharedPath) ? acc.setIn(sharedPath, value) : acc
      }, state)
    : state

module.exports = {
  initialState,
  actionCreators,
  smartContract,
  reducer: smartContract
}
