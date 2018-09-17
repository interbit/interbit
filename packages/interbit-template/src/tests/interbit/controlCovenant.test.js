import assert from 'assert'
import controlCovenant from '../../interbit/control'

describe('control covenant', () => {
  it('returns state on blank action', () => {
    const expectedState = controlCovenant.initialState
    const actualState = controlCovenant.reducer(expectedState, { type: 'TEST' })

    assert.deepStrictEqual(actualState, expectedState)
  })

  it('sets up privateChainHosting state on SET_MANIFEST', () => {
    const chainId = '123456...'
    const blockMaster = 'xfdbhj...'
    const privateCovenantHash = 'abcdef...'

    const stateWithConfig = controlCovenant.initialState
      .setIn(['interbit', 'chainId'], chainId)
      .setIn(['interbit', 'config', 'blockMaster'], blockMaster)

    const expectedState = stateWithConfig.setIn(
      ['privateChainHosting', 'shared', 'templatePrivate'],
      {
        blockMaster,
        sponsorChainId: chainId,
        covenantHash: privateCovenantHash
      }
    )

    const actualState = controlCovenant.reducer(stateWithConfig, {
      type: '@@MANIFEST/SET_MANIFEST',
      payload: {
        manifest: {
          covenants: {
            'template-private': { hash: privateCovenantHash }
          }
        }
      }
    })

    assert.deepStrictEqual(actualState, expectedState)
  })
})
