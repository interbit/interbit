import assert from 'assert'
import Immutable from 'seamless-immutable'
import axios from 'axios'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import covenant from '../../interbit/github-kyc'

describe('github-kyc/covenant', () => {
  describe('reducer', () => {
    it('adds a new profile on UPDATE_PROFILE', () => {
      const consumerChainId = '987654321'
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
      const consumerChainId = '987654321'
      const joinName = 'GITHUB-987654321'
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

      // const mockAxios = { post: () => {}, get: () => {} }
      const startingState = Immutable.from({
        oAuth: {
          shared: {
            params: {
              client_id: 'CLIENT-ID'
            }
          },
          client_secret: 'CLIENT-SECRET',
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
        .put({
          type: covenant.actionTypes.SHARE_PROFILE,
          payload: { consumerChainId, joinName }
        })
        .put({
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
        })
        .put({
          type: covenant.actionTypes.AUTH_SUCEEDED,
          payload: { requestId, joinName }
        })
        .run()
    })
  })
})
