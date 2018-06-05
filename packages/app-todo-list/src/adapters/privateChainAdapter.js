const covenant = require('../interbit/private')

const covenantName = 'Interbit To Do List Private Chain'

const addTodoActionLabel = 'Add a to do item'
const addTodoTitleLabel = 'Enter a title *'
const addTodoDescriptionLabel = 'Enter a description'

const editTodoActionLabel = 'Edit a todo item'
const editTodoIdLabel = 'Enter the ID of the todo to edit'
const editTodoTitleLabel = 'Enter a new title *'
const editTodoDescriptionLabel = 'Enter a new description'

const actionCreators = {
  addTodo: () => ({
    type: addTodoActionLabel,
    arguments: {
      [addTodoTitleLabel]: '',
      [addTodoDescriptionLabel]: ''
    },
    invoke: ({
      [addTodoTitleLabel]: title,
      [addTodoDescriptionLabel]: description
    }) => covenant.actionCreators.addTodo(title, description)
  }),
  editTodo: () => ({
    type: editTodoActionLabel,
    arguments: {
      [editTodoIdLabel]: '',
      [editTodoTitleLabel]: '',
      [editTodoDescriptionLabel]: ''
    },
    invoke: ({
      [editTodoIdLabel]: id,
      [editTodoTitleLabel]: title,
      [editTodoDescriptionLabel]: description
    }) => covenant.actionCreators.editTodo(id, title, description)
  })
}

module.exports = {
  covenantName,
  actionCreators
}
