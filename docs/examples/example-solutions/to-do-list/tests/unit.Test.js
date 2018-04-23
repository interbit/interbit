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

describe('smartContracts', function () {
  it('adds an item on ADD_ITEM action', function () {
    const addItemAction = actions.addItem(itemData.id, itemData.label, itemData.description)

    const itemsState = smartContracts.items(initialState.items, addItemAction)

    should.equal(1, itemsState.length)
    should.deepEqual(itemData, itemsState[0])
  })

  it('toggles the isDone property of an item on TOGGLE_ITEM action', function () {
    const toggleItemAction = actions.toggleItem(itemData.id)
    const state = initialState.setIn(['items', 0], itemData)

    const itemsState = smartContracts.items(state.items, toggleItemAction)

    should.equal(1, itemsState.length)
    should.equal(itemData.id, itemsState[0].id)
    should.equal(itemData.label, itemsState[0].label)
    should.equal(itemData.description, itemsState[0].description)
    should.equal(true, itemsState[0].isDone)
  })
})
