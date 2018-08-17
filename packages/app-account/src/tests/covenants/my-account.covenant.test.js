import assert from 'assert'
import covenant from '../../interbit/my-account'

describe('my-account/covenant', () => {
  describe('reducer', () => {
    it('updates profile on UPDATE_PROFILE', () => {
      const state = covenant.initialState.setIn(['profile'], {
        email: 'meow@meowmeow.com',
        alias: 'cat'
      })

      const action = covenant.actionCreators.updateProfile({
        alias: 'dog',
        email: 'woof@woofwoof.com',
        name: 'Rover'
      })

      const afterState = covenant.reducer(state, action)

      const expectedProfile = {
        alias: 'dog',
        email: 'woof@woofwoof.com',
        name: 'Rover'
      }
      assert.deepStrictEqual(afterState.profile, expectedProfile)
    })

    it('existing tokens are not removed on UPDATE_PROFILE', () => {
      const state = covenant.initialState.setIn(['profile'], {
        email: 'meow@meowmeow.com',
        alias: 'cat',
        name: 'Marmaduke',
        'gitHub-identity': {
          id: 123456,
          name: 'Marmaduke'
        }
      })

      const action = covenant.actionCreators.updateProfile({
        email: 'woof@woofwoof.com',
        name: 'Rover'
      })

      const afterState = covenant.reducer(state, action)

      const expectedProfile = {
        email: 'woof@woofwoof.com',
        alias: 'cat',
        name: 'Rover',
        'gitHub-identity': {
          id: 123456,
          name: 'Marmaduke'
        }
      }
      assert.deepStrictEqual(afterState.profile, expectedProfile)
    })

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
      assert.deepStrictEqual(
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

      assert.deepStrictEqual(
        sideEffects[0].type,
        '@@interbit/START_PROVIDE_STATE'
      )
      assert.deepStrictEqual(sideEffects[0].payload.consumer, requestingChainId)
      assert.deepStrictEqual(sideEffects[0].payload.statePath, [
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

      assert.deepStrictEqual(afterState.shared[requestingChainId], undefined)
    })

    it('resets profile data on RESET_PROFILE', () => {
      const state = covenant.initialState
        .setIn(['profile'], {
          email: 'meow@meowmeow.com',
          alias: 'cat',
          name: 'Marmaduke'
        })
        .setIn(['shared', '123456789', 'sharedProfile'], {
          alias: 'cat',
          name: 'Marmaduke'
        })

      const action = covenant.actionCreators.resetProfile()

      const afterState = covenant.reducer(state, action)

      assert.deepStrictEqual(afterState.profile, covenant.initialState.profile)
      assert.deepStrictEqual(afterState.shared, {})
    })

    it('leaves KYC join provided profile data on RESET_PROFILE', () => {
      const kycTokenName = 'smoogle-identity'
      const kycToken = {
        id: 123456,
        name: 'Marmaduke',
        alias: 'marmasboy22'
      }
      const state = covenant.initialState
        .setIn(
          ['interbit', 'config', 'consuming'],
          [{ mount: ['profile', kycTokenName] }]
        )
        .setIn(['profile'], {
          email: 'meow@meowmeow.com',
          alias: 'cat',
          name: 'Marmaduke',
          [kycTokenName]: kycToken
        })
        .setIn(['shared', '123456789', 'sharedProfile'], {
          alias: 'cat',
          name: 'Marmaduke',
          [kycTokenName]: kycToken
        })

      const action = covenant.actionCreators.resetProfile()

      const afterState = covenant.reducer(state, action)

      assert.deepStrictEqual(afterState.profile, {
        ...covenant.initialState.profile,
        [kycTokenName]: kycToken
      })
      assert.deepStrictEqual(afterState.shared, {})
    })
  })
})
