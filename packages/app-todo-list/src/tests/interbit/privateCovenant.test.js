import assert from 'assert'
import { reducer, initialState, actionCreators } from '../../interbit/private'

describe('app-todo-list private covenant', () => {
  it('ADD_TODO action', () => {
    const validInputs = [
      {
        todo: { title: 'foo', description: 'bar' },
        expectedTodos: [{ id: 0, title: 'foo', description: 'bar' }]
      },
      {
        todo: { title: 'foo' },
        expectedTodos: [{ id: 0, title: 'foo', description: undefined }]
      },
      {
        todo: { title: 'foo', description: 'bar' },
        currentTodos: [{ id: 0, title: 'aaa', description: 'bbb' }],
        expectedTodos: [
          { id: 0, title: 'aaa', description: 'bbb' },
          { id: 1, title: 'foo', description: 'bar' }
        ]
      }
    ]

    const invalidInputs = [
      {
        todo: {}
      },
      { todo: { description: 'foo' } }
    ]

    validInputs.forEach(testCase => {
      const { todo, expectedTodos, currentTodos = [] } = testCase
      const action = actionCreators.addTodo(todo.title, todo.description)
      const startState = initialState.set('todos', currentTodos)
      const newState = reducer(startState, action)
      assert.deepEqual(newState.todos, expectedTodos)
    })

    invalidInputs.forEach(testCase => {
      const { todo } = testCase
      const action = actionCreators.addTodo(todo.title, todo.description)
      const startState = initialState.set('todos', [])
      const newState = reducer(startState, action)
      assert.deepEqual(newState.todos, startState.todos)
    })
  })
})
