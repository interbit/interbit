import should from 'should'
import actions from '../src/actions'
import smartContracts from '../src/smartContracts'
import initialState from '../src/initialState'

const itemData = {
  id: 1,
  label: 'Add toggle to the todo list example',
  description: 'A todo list is not terribly useful if you can\'t mark items done. Implement the toggle feature',
  isDone: false
}

const addItemAction = actions.addItem(itemData.id, itemData.label, itemData.description)

// TODO
// ... implement the toggleItem action creator, and use it for the tests
// const toggleItemAction = actions.toggleItem(itemData.id)

describe('smartContracts', function () {
  it('adds an item on ADD_ITEM action', function () {
    const itemsState = smartContracts.items(initialState.items, addItemAction)

    should.equal(1, itemsState.length)
    should.deepEqual(itemData, itemsState[0])
  })
  
  // TODO
  // ... write this test case
  it('toggles the isDone property of an item on TOGGLE_ITEM action')
})
