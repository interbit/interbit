import should from 'should'
import initialState from '../src/initialState'
import smartContracts from '../src/smartContracts'
import actions from '../src/actions'

const addItemActions = [1, 2, 3, 4, 5].map(id => {
  return actions.addItem(id, 'item' + id, 'Do something')
})

// TODO
// ... implement the toggleItem action creator, and use it for the tests
// const toggleItemAction = actions.toggleItem(1)

// TODO
// const editItemActions = [1, 2, 3, 4, 5].map(id => {
//   return actions.editItem(id, 'item' + id, 'Do something else', false)
// })

describe('To Do List Integration:', function () {
  it('adds 5 items to the list', function () {
    const actionsToTake = addItemActions
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)

    should.equal(5, result.length)
  })

  // TODO
  // ... Paste the first toggle integration test here!
})
