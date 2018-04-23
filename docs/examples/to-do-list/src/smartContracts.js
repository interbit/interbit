import actions from './actions'
import initialState from './initialState'
import Immutable from 'seamless-immutable'

const todolistitems = {
  items: (itemsState = Immutable.from(initialState.items), action) => {
    console.log(action)
    switch (action.type) {
      case actions.ADD_ITEM:
        action.payload.isDone = false
        itemsState = itemsState.concat(action.payload)
        break

      // TODO
      // ... add cases to handle different action types

      default:
        break
    }
    return itemsState
  }

}

export default todolistitems
