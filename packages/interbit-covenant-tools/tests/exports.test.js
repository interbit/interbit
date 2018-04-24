const assert = require('assert')
const api = require('../src')

describe('module exports expected API', () => {
  it('manifestCovenant', () => {
    assert.ok(api.manifestCovenant)
    assert.ok(api.manifestCovenant.actionCreators)
    assert.ok(api.manifestCovenant.actionTypes)
    assert.ok(api.manifestCovenant.reducer)
  })

  it('rootCovenant', () => {
    assert.ok(api.rootCovenant)
    assert.ok(api.rootCovenant.actionCreators)
    assert.ok(api.rootCovenant.actionTypes)
    assert.ok(api.rootCovenant.reducer)
  })

  it('rootStateSelectors', () => {
    assert.ok(api.rootStateSelectors)
  })

  it('mergeCovenants', () => {
    assert.ok(api.mergeCovenants)
  })

  it('validate', () => {
    assert.ok(api.validate)
    assert.ok(api.objectValidationRules)
    assert.ok(api.rulePredicates)
  })
})
