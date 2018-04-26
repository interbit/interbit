const assert = require('assert')
const Immutable = require('seamless-immutable')
const mergeCovenants = require('../../src/mergeCovenants')

describe('chainServices/mergeCovenants', () => {
  it('merges covenants', () => {
    const firstCovenant = {
      initialState: Immutable.from({
        one: 1,
        nested: { a: 1, b: 'b', c: { c1: 1, c2: 'c2', d: { d1: 1, d2: 'd2' } } }
      }),
      actionTypes: {
        one: 'first/ONE'
      },
      actionCreators: {
        one: ({ number }) => ({
          type: 'first/ONE',
          payload: { number }
        })
      },
      reducer: (state = firstCovenant.initialState, action) =>
        action.type === 'first/ONE'
          ? state.set('one', state.one + action.payload.number)
          : state
    }

    const secondCovenant = {
      initialState: Immutable.from({
        two: [],
        nested: { a: 2, c: { c1: 2, c3: 'c3', d: { d1: 2, d3: 'd3' } } }
      }),
      actionTypes: {
        two: 'second/TWO'
      },
      actionCreators: {
        two: ({ text }) => ({
          type: 'second/TWO',
          payload: { text }
        })
      },
      reducer: (state = secondCovenant.initialState, action) =>
        action.type === 'second/TWO'
          ? state.set('two', state.two.concat([action.payload.text]))
          : state
    }

    const resultCovenant = mergeCovenants([firstCovenant, secondCovenant])

    assert.ok(resultCovenant)
    assert.equal('function', typeof resultCovenant.actionCreators.one)
    assert.equal('function', typeof resultCovenant.actionCreators.two)
    assert.equal('first/ONE', resultCovenant.actionTypes.one)
    assert.equal('second/TWO', resultCovenant.actionTypes.two)
    assert.deepEqual(
      Immutable.from({
        one: 1,
        two: [],
        nested: {
          a: 2,
          b: 'b',
          c: { c1: 2, c2: 'c2', c3: 'c3', d: { d1: 2, d2: 'd2', d3: 'd3' } }
        }
      }),
      resultCovenant.initialState
    )

    const action = resultCovenant.actionCreators.one({ number: 1 })
    assert.deepEqual(
      Immutable.from({
        one: 2,
        two: [],
        nested: {
          a: 2,
          b: 'b',
          c: { c1: 2, c2: 'c2', c3: 'c3', d: { d1: 2, d2: 'd2', d3: 'd3' } }
        }
      }),
      resultCovenant.reducer(resultCovenant.initialState, action)
    )

    const anotherAction = resultCovenant.actionCreators.two({ text: 'meow' })
    console.log(anotherAction)
    assert.deepEqual(
      Immutable.from({
        one: 1,
        two: ['meow'],
        nested: {
          a: 2,
          b: 'b',
          c: { c1: 2, c2: 'c2', c3: 'c3', d: { d1: 2, d2: 'd2', d3: 'd3' } }
        }
      }),
      resultCovenant.reducer(resultCovenant.initialState, anotherAction)
    )
  })
})
