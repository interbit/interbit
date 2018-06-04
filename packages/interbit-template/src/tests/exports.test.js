const assert = require('assert')
const api = require('../..')

describe('module exports expected API', () => {
  it('publicCovenant', () => {
    assert.ok(api.publicCovenant)
    assert.ok(api.publicCovenant.actionCreators)
    assert.ok(api.publicCovenant.actionTypes)
    assert.ok(api.publicCovenant.reducer)
  })

  it('manifestCovenant', () => {
    assert.ok(api.privateCovenant)
    assert.ok(api.privateCovenant.actionCreators)
    assert.ok(api.privateCovenant.actionTypes)
    assert.ok(api.privateCovenant.initialState)
    assert.ok(api.privateCovenant.reducer)
  })

  it('controlCovenant', () => {
    assert.ok(api.controlCovenant)
    assert.ok(api.controlCovenant.actionCreators)
    assert.ok(api.controlCovenant.actionTypes)
    assert.ok(api.controlCovenant.initialState)
    assert.ok(api.controlCovenant.reducer)
  })
})
