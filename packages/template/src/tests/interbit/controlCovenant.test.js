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
})
