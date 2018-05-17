const covenant = require('../interbit/public')

const covenantName = 'Interbit SDK Increment Example'
const valueLabel = 'Enter a number'

const actionCreators = {
  add: () => ({
    type: 'Add to the sum',
    arguments: {
      [valueLabel]: ''
    },
    invoke: ({ [valueLabel]: value }) => covenant.actionCreators.add(value)
  })
}

module.exports = {
  covenantName,
  actionCreators
}
