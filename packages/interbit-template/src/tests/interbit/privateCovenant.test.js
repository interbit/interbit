import assert from 'assert'
import { reducer, initialState, actionCreators } from '../../interbit/private'

describe('template private covenant', () => {
  it('MEMO action', () => {
    const validInputs = [
      { text: 'nonsense' },
      {
        text: 'nonsense',
        currentMemos: ['stuff'],
        expectedMemos: ['stuff', 'nonsense']
      }
    ]

    const invalidInputs = [
      {},
      { text: undefined },
      { text: undefined, currentMemos: ['stuff', 'nonsense'] },
      { text: null },
      { text: '' }
    ]

    validInputs.forEach(testCase => {
      const { text, currentMemos = [], expectedMemos = [text] } = testCase
      const action = actionCreators.memo(text)
      const startState = initialState.set('memos', currentMemos)
      const newState = reducer(startState, action)
      assert.deepEqual(newState.memos, expectedMemos)
    })

    invalidInputs.forEach(testCase => {
      const { text, currentMemos = [] } = testCase
      const action = actionCreators.memo(text)
      const startState = initialState.set('memos', currentMemos)
      const newState = reducer(startState, action)
      assert.deepEqual(newState.memos, startState.memos)
    })
  })

  it('ADD action', () => {
    const validInputs = [
      { number: 0 },
      { number: 22 },
      { number: 22, currentTotal: 12, expectedTotal: 34 },
      { number: '22', currentTotal: 12, expectedTotal: 34 },
      { number: 22.022, currentTotal: 12.012, expectedTotal: 34.034 },
      { number: '22.022', currentTotal: 12.012, expectedTotal: 34.034 },
      { number: '123e-1', expectedTotal: 12.3 },
      { number: '', expectedTotal: 0 },
      { number: '0x11', expectedTotal: 17 },
      { number: '0b11', expectedTotal: 3 },
      { number: '0o11', expectedTotal: 9 },
      { number: Number.MAX_VALUE },
      { number: Number.MIN_SAFE_INTEGER },
      { number: Number.MAX_SAFE_INTEGER }
    ]

    const invalidInputs = [
      {},
      { number: undefined },
      { number: 'foo' },
      { number: '100a' },
      { number: Number.NaN },
      { number: Number.POSITIVE_INFINITY },
      { number: Number.NEGATIVE_INFINITY }
    ]

    validInputs.forEach(testCase => {
      const {
        number,
        currentTotal = 0,
        expectedTotal = Number(number)
      } = testCase
      const action = actionCreators.add(number)
      const startState = initialState.set('runningTotal', currentTotal)
      const newState = reducer(startState, action)
      assert.equal(newState.runningTotal, expectedTotal)
    })

    invalidInputs.forEach(testCase => {
      const { number, currentTotal = 12.012 } = testCase
      const action = actionCreators.add(number)
      const startState = initialState.set('runningTotal', currentTotal)
      const newState = reducer(startState, action)
      assert.equal(newState.runningTotal, startState.runningTotal)
    })
  })
})
