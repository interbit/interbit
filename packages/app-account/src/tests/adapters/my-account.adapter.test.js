import assert from 'assert'
import { actionCreators } from '../../adapters/my-account.adapter'

describe('my-account/adapter', () => {
  it('can access the action creator', () => {
    const fields = Object.values(actionCreators).reduce(
      (accum, actionCreator) => {
        const action = actionCreator({})
        return {
          ...accum,
          [action.type]: Object.keys(action.payload || action.arguments)
        }
      },
      {}
    )
    assert(fields)
  })
})
