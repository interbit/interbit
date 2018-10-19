const covenant = require('../interbit/increment')

export const covenantName = 'Interbit SDK Increment Example'
const valueLabel = 'Enter a number'

export const actionCreators = {
  add: () => ({
    type: 'Add to the sum',
    arguments: {
      [valueLabel]: ''
    },
    invoke: ({ [valueLabel]: value }) => covenant.actionCreators.add(value)
  })
}
