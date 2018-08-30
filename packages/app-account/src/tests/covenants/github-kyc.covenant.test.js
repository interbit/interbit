import assert from 'assert'
import Immutable from 'seamless-immutable'
import axios from 'axios'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import covenant from '../../interbit/github-kyc'

describe('github-kyc/covenant', () => {
  describe('reducer', () => {
    it('adds a new profile on UPDATE_PROFILE', () => {
      const privateChainId =
        'b36b03cd329b0e7d5aae0b750b1116950b9b88abccbdeb6eb22d8205ebb13ce5'
      const profile = { id: 'ABC123', name: 'Joe Bloggs' }

      const action = covenant.actionCreators.updateProfile({
        privateChainId,
        profile
      })

      const result = covenant.reducer(covenant.initialState, action)

      assert.deepStrictEqual(
        result.getIn(['profiles', privateChainId, 'sharedProfile']),
        profile
      )
    })

    it('oAuthCallbackSaga works for new private chain', async () => {
      const chainId =
        'eb6eb22d8205ebb13ce5b36b03cd329b0e7d5aae0b750b1116950b9b88abccbd'
      const requestId = '1234'
      const browserChainId =
        'b36b03cd329b0e7d5aae0b750b1116950b9b88abccbdeb6eb22d8205ebb13ce5'
      const publicKey = 'UsersPublicKey'
      const temporaryToken = 'TEMP-TOKEN-AAAAAAA'
      const accessToken = 'ACCESS-TOKEN-DDDDDDD'
      const gitHubProfile = {
        id: 1234,
        login: 'fred',
        type: 'User',
        name: 'Fred Bloggs',
        avatar_url: 'mock://myavatar'
      }

      const sagaAction = covenant.actionCreators.oAuthCallbackSaga({
        requestId,
        publicKey,
        browserChainId,
        temporaryToken
      })

      const startingState = Immutable.from({
        oAuth: {
          shared: {
            params: {
              client_id: '01234567890123456789'
            }
          },
          tokenUrl: 'mock://github.com/login/oauth/access_token',
          profileUrl: 'mock://api.github.com/user'
        },
        profiles: {},
        interbit: {
          chainId
        }
      })

      return expectSaga(covenant.oAuthCallbackSaga, sagaAction, axios)
        .withState(startingState)
        .provide([
          [
            matchers.call.fn(axios.post),
            { data: { access_token: accessToken } }
          ],
          [matchers.call.fn(axios.get), { data: gitHubProfile }]
        ])
        .put.like({
          action: {
            type: covenant.actionTypes.REGISTER_PRIVATE_CHAIN,
            payload: {
              userId: gitHubProfile.id,
              privateChainId: browserChainId,
              publicKey
            }
          }
        })
        .put.like({
          action: {
            type: covenant.actionTypes.UPDATE_PROFILE,
            payload: {
              privateChainId: browserChainId,
              profile: {
                id: gitHubProfile.id,
                login: gitHubProfile.login,
                name: gitHubProfile.name,
                avatarUrl: gitHubProfile.avatar_url
              }
            }
          }
        })
        .put.like({
          action: {
            type: '@@interbit/START_PROVIDE_STATE',
            payload: {
              consumer: browserChainId,
              statePath: ['profiles', browserChainId, 'sharedProfile']
            }
          }
        })
        .put.like({
          action: {
            type: covenant.actionTypes.AUTH_SUCEEDED,
            payload: {
              requestId,
              browserChainId,
              privateChainId: browserChainId,
              providerChainId: chainId
            }
          }
        })
        .run()
    })

    it('oAuthCallbackSaga works for existing private chain', async () => {
      const chainId =
        'eb6eb22d8205ebb13ce5b36b03cd329b0e7d5aae0b750b1116950b9b88abccbd'
      const requestId = '1234'
      const browserChainId =
        'b36b03cd329b0e7d5aae0b750b1116950b9b88abccbdeb6eb22d8205ebb13ce5'
      const publicKey = 'UsersPublicKey'
      const previousChainId =
        'aae0b750b1116950b9b88abccbdeb6ebb22d8205ebb13ce536b03cd329b0e7d5'
      const previousPublicKey = 'PreviousPublicKey'
      const temporaryToken = 'TEMP-TOKEN-AAAAAAA'
      const accessToken = 'ACCESS-TOKEN-DDDDDDD'
      const gitHubId = 1234
      const gitHubProfile = {
        id: gitHubId,
        login: 'fred',
        type: 'User',
        name: 'Fred Bloggs',
        avatar_url: 'mock://myavatar'
      }

      const sagaAction = covenant.actionCreators.oAuthCallbackSaga({
        requestId,
        publicKey,
        browserChainId,
        temporaryToken
      })

      const startingState = Immutable.from({
        oAuth: {
          shared: {
            params: {
              client_id: '01234567890123456789'
            }
          },
          tokenUrl: 'mock://github.com/login/oauth/access_token',
          profileUrl: 'mock://api.github.com/user'
        },
        profiles: {},
        users: {
          [gitHubId]: {
            privateChainId: previousChainId,
            publicKeys: [previousPublicKey]
          }
        },
        interbit: {
          chainId
        }
      })

      return expectSaga(covenant.oAuthCallbackSaga, sagaAction, axios)
        .withState(startingState)
        .provide([
          [
            matchers.call.fn(axios.post),
            { data: { access_token: accessToken } }
          ],
          [matchers.call.fn(axios.get), { data: gitHubProfile }]
        ])
        .put.like({
          action: {
            type: covenant.actionTypes.UPDATE_PRIVATE_CHAIN_ACL,
            payload: {
              userId: gitHubProfile.id,
              privateChainId: previousChainId,
              publicKey
            }
          }
        })
        .put.like({
          action: {
            type: covenant.actionTypes.UPDATE_PROFILE,
            payload: {
              privateChainId: previousChainId,
              profile: {
                id: gitHubProfile.id,
                login: gitHubProfile.login,
                name: gitHubProfile.name,
                avatarUrl: gitHubProfile.avatar_url
              }
            }
          }
        })
        .put.like({
          action: {
            type: '@@interbit/START_PROVIDE_STATE',
            payload: {
              consumer: previousChainId,
              statePath: ['profiles', previousChainId, 'sharedProfile']
            }
          }
        })
        .put.like({
          action: {
            type: covenant.actionTypes.AUTH_SUCEEDED,
            payload: {
              requestId,
              browserChainId,
              privateChainId: previousChainId,
              providerChainId: chainId
            }
          }
        })
        .run()
    })
  })
})
