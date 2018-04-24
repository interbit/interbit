const should = require('should')

const covenant = require('../src/rootCovenant')

describe('rootCovenant', () => {
  it('merges initial state', () => {
    should.deepEqual(covenant.initialState, {
      'interbit-covenant-tools': { manifest: {}, fileLayer: {} }
    })
  })

  it('provides action creators', () => {
    should.exist(covenant.actionCreators)
  })

  it('provides a reducer', () => {
    should.exist(covenant.reducer)
  })
})
