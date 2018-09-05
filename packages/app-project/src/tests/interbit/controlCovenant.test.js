import assert from 'assert'
import controlCovenant from '../../../src/interbit/control'

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
    const projectCovenantHash = 'defghi...'

    const stateWithConfig = controlCovenant.initialState
      .setIn(['interbit', 'chainId'], chainId)
      .setIn(['interbit', 'config', 'blockMaster'], blockMaster)

    const expectedState = stateWithConfig
      .setIn(['privateChainHosting', 'shared', 'projectsPrivate'], {
        blockMaster,
        sponsorChainId: chainId,
        covenantHash: privateCovenantHash
      })
      .setIn(['privateChainHosting', 'shared', 'projectsProject'], {
        blockMaster,
        sponsorChainId: chainId,
        covenantHash: projectCovenantHash
      })

    const actualState = controlCovenant.reducer(stateWithConfig, {
      type: '@@MANIFEST/SET_MANIFEST',
      payload: {
        manifest: {
          covenants: {
            'projects-my-projects': { hash: privateCovenantHash },
            'projects-project': { hash: projectCovenantHash }
          }
        }
      }
    })

    assert.deepStrictEqual(actualState, expectedState)
  })
})
