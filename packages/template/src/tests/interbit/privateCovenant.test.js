import assert from 'assert'
import { reducer, initialState, actionCreators } from '../../interbit/private'

describe('Sample Contracts', () => {
  it('Act action sends text payload', () => {
    const text = 'Sample Text'
    const state = initialState
    const action = actionCreators.act(text)
    const newState = reducer(state, action)

    assert.equal(newState.texts[0], text)
  })
})
