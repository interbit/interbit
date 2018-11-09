import assert from 'assert'
import { createActionCreators } from '../../adapters/my-projects.adapter'

describe('myProjectsChain/covenant', () => {
  it('can access the action creator', () => {
    const actionCreators = createActionCreators()
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
