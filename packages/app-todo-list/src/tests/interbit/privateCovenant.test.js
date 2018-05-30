import assert from 'assert'
import { reducer, initialState, actionCreators } from '../../interbit/private'

describe('app-todo-list private covenant', () => {
  it('ADD_TODO action', () => {
    const validInputs = [
      {
        todo: { title: 'foo', description: 'bar' },
        expectedTodos: [
          { id: 0, title: 'foo', description: 'bar', completed: false }
        ]
      },
      {
        todo: { title: 'foo' },
        expectedTodos: [
          { id: 0, title: 'foo', description: undefined, completed: false }
        ]
      },
      {
        todo: { title: 'foo', description: 'bar' },
        currentTodos: [
          { id: 0, title: 'aaa', description: 'bbb', completed: false }
        ],
        expectedTodos: [
          { id: 0, title: 'aaa', description: 'bbb', completed: false },
          { id: 1, title: 'foo', description: 'bar', completed: false }
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

  it('TOGGLE_TODO action', () => {
    const validInputs = [
      {
        id: 0,
        currentTodos: [
          { id: 0, title: 'foo', description: 'bar', completed: false }
        ],
        expectedTodos: [
          { id: 0, title: 'foo', description: 'bar', completed: true }
        ]
      }
    ]

    const invalidInputs = [
      {},
      { id: undefined },
      { id: 'foo' },
      { id: Number.NaN },
      { id: Number.POSITIVE_INFINITY },
      { id: Number.NEGATIVE_INFINITY }
    ]

    validInputs.forEach(testCase => {
      const { id, currentTodos, expectedTodos } = testCase
      const action = actionCreators.toggleTodo(id)
      const startState = initialState.set('todos', currentTodos)
      const newState = reducer(startState, action)
      assert.deepEqual(newState.todos, expectedTodos)
    })

    invalidInputs.forEach(testCase => {
      const { id } = testCase
      const action = actionCreators.toggleTodo(id)
      const currentTodos = [
        { id: 0, title: 'foo', description: 'bar', completed: false }
      ]
      const startState = initialState.set('todos', currentTodos)
      const newState = reducer(startState, action)
      assert.deepEqual(newState.todos, startState.todos)
    })
  })
})
