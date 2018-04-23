import assert from 'assert'
import covenant from '../../interbit/my-account'

describe('my-account/covenant', () => {
  describe('reducer', () => {
    it('adds a new connection path on SHARE_PROFILE_TOKENS', () => {
      const ownChainId = '987654321'
      const requestingChainId = '123456789'
      const sharedTokens = ['catSays']

      const state = covenant.initialState.setIn(['profile'], {
        catSays: 'meowmeowmeow',
        dogSays: 'woof'
      })

      const action = covenant.actionCreators.shareProfileTokens({
        providerChainId: ownChainId,
        consumerChainId: requestingChainId,
        sharedTokens
      })

      const afterState = covenant.reducer(state, action)

      const expectedSharedTokens = { catSays: 'meowmeowmeow' }
      assert.deepEqual(
        afterState.shared[requestingChainId].sharedProfile,
        expectedSharedTokens
      )
    })

    it('sets up the provider end of the join on SHARE_PROFILE_TOKENS', () => {
      const ownChainId = '987654321'
      const requestingChainId = '123456789'
      const sharedTokens = ['catSays']

      const state = covenant.initialState.setIn(['profile'], {
        catSays: 'meowmeowmeow',
        dogSays: 'woof'
      })

      const action = covenant.actionCreators.shareProfileTokens({
        providerChainId: ownChainId,
        consumerChainId: requestingChainId,
        sharedTokens
      })

      const afterState = covenant.reducer(state, action)
      const sideEffects = afterState.sideEffects

      assert.equal(sideEffects[0].type, '@@interbit/START_PROVIDE_STATE')
      assert.equal(sideEffects[0].payload.consumer, requestingChainId)
      assert.deepEqual(sideEffects[0].payload.statePath, [
        'shared',
        requestingChainId,
        'sharedProfile'
      ])
    })

    it('removes the shared profile data on STOP_SHARING', () => {
      const requestingChainId = '123456789'

      const state = covenant.initialState.setIn(
        ['shared', requestingChainId, 'sharedProfile'],
        { catSays: 'meowmeowmeow' }
      )

      const action = covenant.actionCreators.stopSharing({
        consumerChainId: requestingChainId
      })

      const afterState = covenant.reducer(state, action)

      assert.equal(afterState.shared[requestingChainId], undefined)
    })
  })
})
