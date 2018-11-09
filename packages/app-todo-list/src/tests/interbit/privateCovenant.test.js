import assert from 'assert'
import { reducer, initialState, actionCreators } from '../../interbit/private'

describe('app-todo-list private covenant', () => {
  const aTodo = { title: 'foo', description: 'bar' }
  const aCompletedTodo = { ...aTodo, completed: true, id: 0 }
  const constructState = todos => initialState.set('todos', todos)

  const tests = [
    {
      name: 'ADD_TODO adds the first todo',
      state: constructState([]),
      action: actionCreators.addTodo(aTodo.title, aTodo.description),
      expectedTodos: [{ ...aTodo, completed: false, id: 0 }]
    },
    {
      name: 'ADD_TODO adds a todo with no description',
      state: constructState([]),
      action: actionCreators.addTodo(aTodo.title),
      expectedTodos: [
        { title: aTodo.title, description: undefined, completed: false, id: 0 }
      ]
    },
    {
      name: 'ADD_TODO adds a todo when there is already a todo',
      state: constructState([{ ...aCompletedTodo, completed: false }]),
      action: actionCreators.addTodo('meow', 'meow'),
      expectedTodos: [
        { ...aCompletedTodo, completed: false },
        { title: 'meow', description: 'meow', id: 1, completed: false }
      ]
    },
    {
      name: "ADD_TODO doesn't add a todo when it's bunk",
      state: constructState([]),
      action: actionCreators.addTodo(),
      expectedTodos: []
    },
    {
      name: 'EDIT_TODO edits a todo',
      state: constructState([
        { id: 0, title: 'cat', description: 'woof', completed: false }
      ]),
      action: actionCreators.editTodo(0, aTodo.title, aTodo.description, true),
      expectedTodos: [aCompletedTodo]
    },
    {
      name: 'EDIT_TODO does nothing when there are no todos to edit',
      state: constructState([]),
      action: actionCreators.editTodo(0, aTodo.title, aTodo.description, true),
      expectedTodos: []
    },
    {
      name: 'EDIT_TODO does nothing when todo does not exist',
      state: constructState([aCompletedTodo]),
      action: actionCreators.editTodo(1, aTodo.title, aTodo.description, true),
      expectedTodos: [aCompletedTodo]
    },
    {
      name: 'TOGGLE_TODO toggles an incomplete todo',
      state: constructState([{ ...aCompletedTodo, completed: false }]),
      action: actionCreators.toggleTodo(aCompletedTodo.id),
      expectedTodos: [aCompletedTodo]
    },
    {
      name: 'TOGGLE_TODO toggles a completed todo',
      state: constructState([aCompletedTodo]),
      action: actionCreators.toggleTodo(aCompletedTodo.id),
      expectedTodos: [{ ...aCompletedTodo, completed: false }]
    },
    {
      name: 'TOGGLE_TODO does nothing when no ID is given',
      state: constructState([aCompletedTodo]),
      action: actionCreators.toggleTodo(),
      expectedTodos: [aCompletedTodo]
    },
    {
      name: 'TOGGLE_TODO does nothing when undefined is given',
      state: constructState([aCompletedTodo]),
      action: actionCreators.toggleTodo(undefined),
      expectedTodos: [aCompletedTodo]
    },
    {
      name: 'TOGGLE_TODO does nothing when foo is given',
      state: constructState([aCompletedTodo]),
      action: actionCreators.toggleTodo('foo'),
      expectedTodos: [aCompletedTodo]
    },
    {
      name: 'TOGGLE_TODO does nothing when NaN is given',
      state: constructState([aCompletedTodo]),
      action: actionCreators.toggleTodo(Number.NaN),
      expectedTodos: [aCompletedTodo]
    },
    {
      name: 'TOGGLE_TODO does nothing when -infinity is given',
      state: constructState([aCompletedTodo]),
      action: actionCreators.toggleTodo(Number.NEGATIVE_INFINITY),
      expectedTodos: [aCompletedTodo]
    }
  ]

  tests.forEach(test => {
    it(test.name, () => {
      const actualState = reducer(test.state, test.action)
      assert.deepStrictEqual(actualState.todos, test.expectedTodos)
    })
  })
})
