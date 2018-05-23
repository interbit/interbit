const covenant = require('../interbit/private')

const covenantName = 'Interbit Template Private Chain'

const memoActionLabel = 'Record your thoughts'
const textParamLabel = 'Enter some text'

const addActionLabel = 'Add-up some numbers'
const numberParamLabel = 'Enter a number'

const addItemActionLabel = 'Add a to do item'
const addItemTitleLabel = 'Enter a title'
const addItemDescriptionLabel = 'Enter a description'

const actionCreators = {
  memo: () => ({
    type: memoActionLabel,
    arguments: {
      [textParamLabel]: ''
    },
    invoke: ({ [textParamLabel]: text }) => covenant.actionCreators.memo(text)
  }),

  add: () => ({
    type: addActionLabel,
    arguments: {
      [numberParamLabel]: ''
    },
    invoke: ({ [numberParamLabel]: number }) =>
      covenant.actionCreators.add(number)
  }),

  addItem: () => ({
    type: addItemActionLabel,
    arguments: {
      [addItemTitleLabel]: '',
      [addItemDescriptionLabel]: ''
    },
    invoke: ({
      [addItemTitleLabel]: title,
      [addItemDescriptionLabel]: description
    }) => covenant.actionCreators.addTodo(title, description)
  })
}

module.exports = {
  covenantName,
  actionCreators
}
