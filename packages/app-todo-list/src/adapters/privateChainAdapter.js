const covenant = require('../interbit/private')

const covenantName = 'Interbit Template Private Chain'

const addTodoActionLabel = 'Add a to do item'
const addTodoTitleLabel = 'Enter a title *'
const addTodoDescriptionLabel = 'Enter a description'

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
  })
}

module.exports = {
  covenantName,
  actionCreators
}
