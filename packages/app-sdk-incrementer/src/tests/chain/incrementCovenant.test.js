import assert from 'assert'
import Immutable from 'seamless-immutable'
import covenant from '../../interbit/increment'

describe('covenant', () => {
  const sum = 25
  const chainState = Immutable.from({ sum })

  it('updates sum on ADD', () => {
    const action = covenant.actionCreators.add(10)

    const afterState = covenant.reducer(chainState, action)

    assert.equal(afterState.sum, 35)
  })
})
