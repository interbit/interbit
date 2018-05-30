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

      case actions.EDIT_ITEM:
        itemsState.some((item, index) => {
          if (item.id === action.payload.id) {
            itemsState = itemsState.setIn([index], action.payload)
            return true
          }
        })
        break

      case actions.TOGGLE_ITEM:
        const itemIndex = itemsState.findIndex(item => item.id === action.payload.id)
        if (itemIndex !== -1) {
          const isDone = !itemsState[itemIndex].isDone
          itemsState = itemsState.setIn([itemIndex, 'isDone'], isDone)
        }
        break

      default:
        break
    }
    return itemsState
  }

}

export default todolistitems
