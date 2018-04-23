import assert from 'assert'
import hubCovenant from '../../interbit/hub'
import spokeCovenant from '../../interbit/spoke/actions'

describe('hubCovenant', () => {
  const chainId = '987654321'
  const chainState = hubCovenant.initialState.setIn(
    ['interbit', 'chainId'],
    chainId
  )

  it('updates chainName on CHAIN_METADATA', () => {
    const chainName = 'secret'
    const action = hubCovenant.actionCreators.chainMetadata({
      chainName
    })

    const afterState = hubCovenant.smartContract(chainState, action)

    assert.equal(afterState.chainMetadata.chainName, chainName)
  })

  it('updates privateTokens on PRIVATE_TOKEN', () => {
    const tokenName = 'secret'
    const value = 'I love cats!'
    const action = hubCovenant.actionCreators.privateToken({
      tokenName,
      value
    })

    const afterState = hubCovenant.smartContract(chainState, action)

    assert.equal(afterState.privateTokens[tokenName], value)
  })

  it('updates sharedTokens on SHAREABLE_TOKEN', () => {
    const tokenName = 'What cats say'
    const value = 'meowmeowmeow!'
    const action = hubCovenant.actionCreators.sharableToken({
      tokenName,
      value
    })

    const afterState = hubCovenant.smartContract(chainState, action)
    assert.equal(afterState.shareableTokens[tokenName], value)
  })

  it('updates tokenRequests on TOKEN_REQUEST', () => {
    const tokenName = 'What cats say'
    const consumerChainId = '123456789'
    const consumerRequestId = '42'
    const justification = 'just because!'
    const action = hubCovenant.actionCreators.tokenRequest({
      tokenName,
      consumerChainId,
      consumerRequestId,
      justification
    })

    const expected = {
      tokenName,
      consumerChainId,
      consumerRequestId,
      justification
    }
    const afterState = hubCovenant.smartContract(chainState, action)
    assert.deepEqual(Object.values(afterState.tokenRequests)[0], expected)
  })

  it('removes tokenRequest on DENY_TOKEN_REQUEST', () => {
    const tokenName = 'What cats say'
    const consumerChainId = '123456789'
    const justification = 'just because!'
    const tokenRequest = {
      tokenName,
      consumerChainId,
      justification
    }
    const requestId = '456789012'
    const state = chainState.setIn(['tokenRequests', requestId], tokenRequest)

    const action = hubCovenant.actionCreators.denyTokenRequest({
      requestId
    })

    const afterState = hubCovenant.smartContract(state, action)
    assert.deepEqual(afterState.tokenRequests, {})
  })

  it('removes tokenRequest on APPROVE_TOKEN_REQUEST', () => {
    const tokenName = 'What cats say'
    const consumerChainId = '123456789'
    const justification = 'just because!'
    const tokenRequest = {
      tokenName,
      consumerChainId,
      justification
    }
    const requestId = '456789012'
    const beforeState = chainState.setIn(
      ['tokenRequests', requestId],
      tokenRequest
    )

    const action = hubCovenant.actionCreators.approveTokenRequest({
      requestId
    })

    const afterState = hubCovenant.smartContract(beforeState, action)
    assert.deepEqual(afterState.tokenRequests, {})
  })

  it('makes a consumer specific copy of the token on APPROVE_TOKEN_REQUEST', () => {
    const tokenName = 'What cats say'
    const value = 'meowmeowmeow!'
    const consumerChainId = '123456789'
    const consumerRequestId = '42'
    const justification = 'just because!'
    const tokenRequest = {
      tokenName,
      consumerChainId,
      consumerRequestId,
      justification
    }
    const requestId = '456789012'
    const beforeState = chainState
      .setIn(['shareableTokens', tokenName], value)
      .setIn(['tokenRequests', requestId], tokenRequest)

    const action = hubCovenant.actionCreators.approveTokenRequest({
      requestId
    })

    const afterState = hubCovenant.smartContract(beforeState, action)
    assert.equal(afterState.sharedTokens[requestId][tokenName], value)
  })

  it('sets up a START_PROVIDE_STATE side-effect on MOUNT_TOKEN', () => {
    const tokenName = 'What cats say'
    const value = 'meowmeowmeow!'
    const consumerChainId = '123456789'
    const consumerRequestId = '42'
    const justification = 'just because!'
    const tokenRequest = {
      tokenName,
      consumerChainId,
      consumerRequestId,
      justification
    }
    const requestId = '456789012'
    const beforeState = chainState
      .setIn(['shareableTokens', tokenName], value)
      .setIn(['tokenRequests', requestId], tokenRequest)

    const action = hubCovenant.actionCreators.approveTokenRequest({
      requestId
    })

    const afterState = hubCovenant.smartContract(beforeState, action)
    const sideEffect = afterState.sideEffects[0]
    assert.equal(sideEffect.type, '@@interbit/START_PROVIDE_STATE')
    assert.equal(sideEffect.payload.consumer, consumerChainId)
    assert.deepEqual(sideEffect.payload.statePath, ['sharedTokens', requestId])
  })

  it('adds a pending MOUNT_TOKEN action to dispatch to the consumer chain on APPROVE_TOKEN_REQUEST', () => {
    const tokenName = 'What cats say'
    const value = 'meowmeowmeow!'
    const consumerChainId = '123456789'
    const consumerRequestId = '42'
    const justification = 'just because!'
    const tokenRequest = {
      tokenName,
      consumerChainId,
      consumerRequestId,
      justification
    }
    const requestId = '456789012'
    const beforeState = chainState
      .setIn(['shareableTokens', tokenName], value)
      .setIn(['tokenRequests', requestId], tokenRequest)

    const action = hubCovenant.actionCreators.approveTokenRequest({
      requestId
    })

    const afterState = hubCovenant.smartContract(beforeState, action)
    const pendingAction =
      afterState.interbit['sent-actions'][consumerChainId]['pending-actions'][0]

    assert.equal(pendingAction.type, spokeCovenant.actionTypes.MOUNT_TOKEN)
    assert.equal(pendingAction.payload.providerChainId, chainId)
    assert.equal(pendingAction.payload.tokenName, tokenName)
    assert.equal(pendingAction.payload.consumerRequestId, consumerRequestId)
  })

  it('removes token on REVOKE_TOKEN', () => {
    const requestId = '789'
    const tokenName = 'What cats say'
    const value = 'meowmeowmeow!'
    const consumerChainId = '123456789'
    const beforeState = chainState.setIn(['sharedTokens', requestId], {
      [tokenName]: value,
      consumerChainId
    })

    const action = hubCovenant.actionCreators.revokeToken({
      requestId
    })

    const afterState = hubCovenant.smartContract(beforeState, action)
    assert.deepEqual(afterState.sharedTokens, {})
  })
})
