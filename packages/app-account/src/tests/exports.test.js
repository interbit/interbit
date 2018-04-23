import assert from 'assert'
import module from '../exports'

describe('module correctly exports covenants', () => {
  it('contains the public/private/control and github covenants', () => {
    assert.ok(module.privateCovenant)
    assert.ok(module.publicCovenant)
    assert.ok(module.controlCovenant)
    assert.ok(module.githubOAuthCovenant)
  })
})
