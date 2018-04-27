const should = require('should')

const { rootCovenant } = require('../../src/rootCovenant')

describe('rootCovenant', () => {
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
