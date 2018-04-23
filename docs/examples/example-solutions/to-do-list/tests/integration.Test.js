import should from 'should'
import initialState from '../src/initialState'
import smartContracts from '../src/smartContracts'
import actions from '../src/actions'

const addItemActions = [1, 2, 3, 4, 5].map(id => {
  return actions.addItem(id, 'item' + id, 'Do something')
})
const editItemActions = [1, 2, 3, 4, 5].map(id => {
  return actions.editItem(id, 'item' + id, 'Do something else', false)
})
const toggleItemAction = actions.toggleItem(1)

describe('To Do List Integration:', function () {
  it('adds 5 items to the list', function () {
    const actionsToTake = addItemActions
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)

    should.equal(5, result.length)
  })

  it('edits items it has just added to the list', function () {
    const actionsToTake = [].concat(addItemActions, editItemActions)
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)

    should.equal('Do something else', result[0].description)
    should.equal('Do something else', result[1].description)
    should.equal('Do something else', result[2].description)
    should.equal('Do something else', result[3].description)
    should.equal('Do something else', result[4].description)
  })

  it('toggles items back and forth several times, twice, and once', function () {
    const actionsToTake = [].concat(addItemActions[0], toggleItemAction, toggleItemAction, toggleItemAction)
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)

    should.equal(true, result[0].isDone)

    const moreActionsTaken = [].concat(toggleItemAction, toggleItemAction)
    const secondResult = moreActionsTaken.reduce(smartContracts.items, result)

    should.equal(true, secondResult[0].isDone)

    const evenMoreActions = [].concat(toggleItemAction)
    const thirdResult = evenMoreActions.reduce(smartContracts.items, secondResult)

    should.equal(false, thirdResult[0].isDone)
  })

  it('adds, edits, and toggles an item', function () {
    const actionsToTake = [].concat(addItemActions[0], editItemActions[0], toggleItemAction)
    const result = actionsToTake.reduce(smartContracts.items, initialState.items)
    const item = result[0]

    should.equal(1, item.id)
    should.equal('item1', item.label)
    should.equal('Do something else', item.description)
    should.equal(true, item.isDone)
  })
})
