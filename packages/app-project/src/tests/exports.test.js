import assert from 'assert'
import module from '../exports'

describe('module correctly exports covenants', () => {
  it('contains the myProjects and project covenant', () => {
    assert.ok(module.myProjectsCovenant)
    assert.ok(module.projectCovenant)
  })
})
