import assert from 'assert'
import Immutable from 'seamless-immutable'
import axios from 'axios'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import covenant from '../../interbit/github-kyc'

describe('github-kyc/covenant', () => {
  describe('reducer', () => {
    it('adds a new profile on UPDATE_PROFILE', () => {
      const consumerChainId =
        'b36b03cd329b0e7d5aae0b750b1116950b9b88abccbdeb6eb22d8205ebb13ce5'
      const profile = { id: 'ABC123', name: 'Joe Bloggs' }

      const action = covenant.actionCreators.updateProfile({
        consumerChainId,
        profile
      })

      const result = covenant.reducer(covenant.initialState, action)

      assert.deepEqual(
        result.getIn(['profiles', consumerChainId, 'sharedProfile']),
        profile
      )
    })

    it('oAuthCallbackSaga works', async () => {
      const requestId = '1234'
      const consumerChainId =
        'b36b03cd329b0e7d5aae0b750b1116950b9b88abccbdeb6eb22d8205ebb13ce5'
      const joinName = 'GITHUB-0003E343-787E-4C9C-B596-AED2B2BE41B9'
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
        consumerChainId,
        joinName,
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
        profiles: {}
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
            type: '@@interbit/START_PROVIDE_STATE',
            payload: {
              consumer: consumerChainId,
              statePath: ['profiles', consumerChainId, 'sharedProfile']
            }
          }
        })
        .put.like({
          action: {
            type: covenant.actionTypes.UPDATE_PROFILE,
            payload: {
              consumerChainId,
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
            type: covenant.actionTypes.AUTH_SUCEEDED,
            payload: { requestId }
          }
        })
        .run()
    })
  })
})
