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

      assert.strictEqual(sideEffects[0].type, '@@interbit/START_PROVIDE_STATE')
      assert.strictEqual(sideEffects[0].payload.consumer, requestingChainId)
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

      assert.strictEqual(afterState.shared[requestingChainId], undefined)
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

  describe('Authentication actions', () => {
    const authRequest = {
      oAuthProvider: 'fancyIdentityService',
      requestId: 1234,
      timestamp: 123456789
    }
    const completeAuthPayload = {
      oAuthProvider: 'fancyIdentityService',
      providerChainId: 'woof',
      tokenName: 'cat',
      joinName: 'meow',
      requestId: 1234,
      timestamp: 123456789
    }

    it('adds an auth request on START_AUTHENTICATION', () => {
      const expectedState = covenant.initialState.setIn(
        ['authenticationRequests', authRequest.requestId],
        {
          oAuthProvider: authRequest.oAuthProvider,
          timestamp: authRequest.timestamp
        }
      )
      const action = covenant.actionCreators.startAuthentication(authRequest)
      const afterState = covenant.reducer(covenant.initialState, action)

      assert.deepStrictEqual(expectedState, afterState)
    })

    it('removes the auth request on CANCEL_AUTHENTICATION', () => {
      const expectedState = covenant.initialState
      const startState = covenant.initialState.setIn(
        ['authenticationRequests', authRequest.requestId],
        {
          oAuthProvider: authRequest.oAuthProvider,
          timestamp: authRequest.timestamp
        }
      )
      const action = covenant.actionCreators.cancelAuthentication({
        requestId: authRequest.requestId
      })
      const afterState = covenant.reducer(startState, action)

      assert.deepStrictEqual(expectedState, afterState)
    })

    it('does nothing if the auth request does not exist on CANCEL_AUTHENTICATION', () => {
      const expectedState = covenant.initialState.setIn(
        ['authenticationRequests', authRequest.requestId],
        {
          oAuthProvider: authRequest.oAuthProvider,
          timestamp: authRequest.timestamp
        }
      )
      const action = covenant.actionCreators.cancelAuthentication({
        requestId: 1111
      })
      const afterState = covenant.reducer(expectedState, action)

      assert.deepStrictEqual(expectedState, afterState)
    })

    it('consumes the token info on COMPLETE_AUTHENTICATION and removes the auth request', () => {
      const payload = completeAuthPayload
      const startState = covenant.initialState.setIn(
        ['authenticationRequests', payload.requestId],
        { oAuthProvider: payload.oAuthProvider, timestamp: payload.timestamp }
      )
      const action = covenant.actionCreators.completeAuthentication(payload)
      const afterState = covenant.reducer(startState, action)
      const sideEffect = afterState.sideEffects[0]

      assert.strictEqual(sideEffect.type, '@@interbit/START_CONSUME_STATE')
      assert.deepStrictEqual(sideEffect.payload, {
        joinName: payload.joinName,
        mount: ['profile', payload.tokenName],
        provider: payload.providerChainId
      })
      assert.deepStrictEqual(afterState.authenticationRequests, {})
    })

    it('does nothing on COMPLETE_AUTHENTICATION if the auth request does not exist', () => {
      const expectedState = covenant.initialState.setIn(
        ['authenticationRequests', 1111],
        {
          oAuthProvider: authRequest.oAuthProvider,
          timestamp: authRequest.timestamp
        }
      )
      const payload = completeAuthPayload
      const action = covenant.actionCreators.completeAuthentication(payload)
      const afterState = covenant.reducer(expectedState, action)

      assert.deepStrictEqual(expectedState, afterState)
    })

    it('removes the auth request on COMPLETE_AUTHENTICATION if the join already exists', () => {
      const payload = completeAuthPayload
      const expectedState = covenant.initialState.setIn(
        ['interbit', 'config', 'consuming'],
        [{ provider: payload.providerChainId, joinName: payload.joinName }]
      )

      const startState = covenant.initialState
        .setIn(
          ['interbit', 'config', 'consuming'],
          [
            {
              provider: payload.providerChainId,
              joinName: payload.joinName
            }
          ]
        )
        .setIn(['authenticationRequests', payload.requestId], {
          oAuthProvider: payload.oAuthProvider,
          timestamp: payload.timestamp
        })

      const action = covenant.actionCreators.completeAuthentication(payload)
      const afterState = covenant.reducer(startState, action)

      assert.deepStrictEqual(expectedState, afterState)
    })
  })
})
