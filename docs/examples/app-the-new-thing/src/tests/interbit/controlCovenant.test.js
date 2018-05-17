import assert from 'assert'
import controlCovenant from '../../../src/interbit/control'

describe('control covenant', () => {
  it('returns state on blank action', () => {
    const expectedState = controlCovenant.initialState
    const actualState = controlCovenant.reducer(expectedState, { type: 'TEST' })

    assert.deepEqual(actualState, expectedState)
  })

  it('returns state on SET_MANIFEST', () => {
    const actualState = controlCovenant.reducer(controlCovenant.initialState, {
      type: '@@MANIFEST/SET_MANIFEST',
      payload: {
        manifest: {}
      }
    })

    assert.ok(actualState)
  })

  it('counts meows', () => {
    const goodCat = 'Mr. Tibbs'
    const action = controlCovenant.actionCreators.meow(goodCat)
    const actualState = controlCovenant.reducer(
      controlCovenant.initialState,
      action
    )

    assert.equal(actualState.cats[goodCat], 1)
  })

  it('adds role and pubkey to ACL on sponsor request', () => {
    const catPubKey = 'catPubKey'
    const controlPubKey = 'controlPubKey'
    const action = {
      type: '@@interbit/SPONSOR_CHAIN_REQUEST',
      payload: {
        genesisBlock: {
          content: {
            state: {
              interbit: {
                config: {
                  consuming: [],
                  acl: {
                    actionPermissions: {
                      '*': ['root']
                    },
                    roles: {
                      root: [catPubKey, controlPubKey]
                    }
                  },
                  blockMaster: controlPubKey
                }
              }
            }
          }
        }
      }
    }
    const state = controlCovenant.initialState.setIn(
      ['interbit', 'config', 'blockMaster'],
      controlPubKey
    )

    const actualState = controlCovenant.reducer(state, action)

    assert.deepEqual(actualState.sideEffects[0], {
      payload: {
        actionPermissions: { MEOW: 'coolcats' },
        roles: { coolcats: ['catPubKey'] }
      },
      type: '@@interbit/ADD_TO_ACL'
    })
  })
})
