import Immutable from 'seamless-immutable'

// Sample to do item state
//
// const todo = {
//   id: 0,
//   label: 'Add toggle to the todo list example',
//   description: 'A todo list is not terribly useful if you can\'t mark items done. Implement the toggle feature'
//   isDone: false
// }

const initialState = Immutable.from({
  items: []
})

export default initialState
