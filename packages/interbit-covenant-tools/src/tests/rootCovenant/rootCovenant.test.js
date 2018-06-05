const should = require('should')

const { rootCovenant } = require('../../rootCovenant')

describe('rootCovenant', () => {
  it('reduces SET_MANIFEST correctly', () => {
    const manifest = {
      this: 'is rly a manifest.'
    }

    const state = rootCovenant.initialState
    const action = rootCovenant.actionCreators.setManifest(manifest)

    const nextState = rootCovenant.reducer(state, action)

    should.deepEqual(nextState.interbitRoot.manifest, manifest)
  })

  it('merges initial state', () => {
    should.deepEqual(rootCovenant.initialState, {
      interbitRoot: { manifest: {}, fileLayer: {} }
    })
  })

  it('provides action creators', () => {
    should.exist(rootCovenant.actionCreators)
  })

  it('provides a reducer', () => {
    should.exist(rootCovenant.reducer)
  })
})
