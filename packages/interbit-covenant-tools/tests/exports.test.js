const assert = require('assert')
const api = require('../src')

describe('module exports expected API', () => {
  it('createAction', () => {
    assert.ok(api.createAction)
  })

  it('coreCovenant', () => {
    assert.ok(api.coreCovenant)
    assert.ok(api.coreCovenant.actionCreators)
    assert.ok(api.coreCovenant.actionCreators.authorizeReceiveActions)
    assert.ok(api.coreCovenant.actionCreators.authorizeSendActions)
    assert.ok(api.coreCovenant.actionCreators.startConsumeState)
    assert.ok(api.coreCovenant.actionCreators.startProvideState)
    assert.ok(api.coreCovenant.actionCreators.setAcl)
    assert.ok(api.coreCovenant.actionCreators.addToAcl)
    assert.ok(api.coreCovenant.actionCreators.createChildChain)
    assert.ok(api.coreCovenant.actionCreators.sponsorChainRequest)
    assert.ok(api.coreCovenant.actionCreators.sponsorChain)
    assert.ok(api.coreCovenant.actionTypes)
    assert.ok(api.coreCovenant.constants)
    assert.ok(api.coreCovenant.redispatch)
    assert.ok(api.coreCovenant.redispatches)
    assert.ok(api.coreCovenant.removeRedispatches)
    assert.ok(api.coreCovenant.remoteRedispatch)
    assert.ok(api.coreCovenant.shiftRedispatchQueue)
    assert.ok(api.coreCovenant.pushUpRedispatches)
  })

  it('manifestCovenant', () => {
    assert.ok(api.manifestCovenant)
    assert.ok(api.manifestCovenant.actionCreators)
    assert.ok(api.manifestCovenant.actionTypes)
    assert.ok(api.manifestCovenant.initialState)
    assert.ok(api.manifestCovenant.reducer)
  })

  it('rootCovenant', () => {
    assert.ok(api.rootCovenant)
    assert.ok(api.rootCovenant.actionCreators)
    assert.ok(api.rootCovenant.actionTypes)
    assert.ok(api.rootCovenant.initialState)
    assert.ok(api.rootCovenant.reducer)
  })

  it('rootStateSelectors', () => {
    assert.ok(api.rootStateSelectors)
  })

  it('cAuthConsumerCovenant', () => {
    assert.ok(api.cAuthConsumerCovenant)
    assert.ok(api.cAuthConsumerCovenant.actionCreators)
    assert.ok(api.cAuthConsumerCovenant.actionTypes)
    assert.ok(api.cAuthConsumerCovenant.initialState)
    assert.ok(api.cAuthConsumerCovenant.reducer)
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
