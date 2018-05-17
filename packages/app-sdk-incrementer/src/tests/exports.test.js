const assert = require('assert')
const api = require('../..')

describe('module exports expected API', () => {
  it('publicCovenant', () => {
    assert.ok(api.publicCovenant)
    assert.ok(api.publicCovenant.actionCreators)
    assert.ok(api.publicCovenant.actionTypes)
    assert.ok(api.publicCovenant.reducer)
  })
})
