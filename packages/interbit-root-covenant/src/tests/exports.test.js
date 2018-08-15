const assert = require('assert')
const interbitRootCovenant = require('../')

describe('interbit-root-covenant exports correct API', () => {
  it('exports standard covenant API', () => {
    assert.ok(interbitRootCovenant.reducer, 'Reducer is not included in API')
    assert.ok(
      interbitRootCovenant.actionCreators,
      'Action creators are not included in API'
    )
    assert.ok(
      interbitRootCovenant.initialState,
      'Initial state is not included in API'
    )
  })
})
