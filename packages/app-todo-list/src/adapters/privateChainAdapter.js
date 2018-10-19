const covenant = require('../interbit/private')

export const covenantName = 'Interbit To-do List Private Chain'

const addTodoActionLabel = 'Add a to-do item'
const addTodoTitleLabel = 'Enter a title *'
const addTodoDescriptionLabel = 'Enter a description'

const editTodoActionLabel = 'Edit a to-do item'
const editTodoIdLabel = 'Enter the ID of the to-do to edit'
const editTodoTitleLabel = 'Enter a new title *'
const editTodoDescriptionLabel = 'Enter a new description'

export const actionCreators = {
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
