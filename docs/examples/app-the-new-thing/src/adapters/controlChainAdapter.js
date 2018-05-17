const covenant = require('../interbit/control')

const covenantName = 'Interbit Template Control Chain'

const meowActionLabel = 'Meow at the Moon'
const textParamLabel = 'Who even meowed?'

const actionCreators = {
  meow: () => ({
    type: meowActionLabel,
    arguments: {
      [textParamLabel]: ''
    },
    invoke: ({ [textParamLabel]: whoMeowed }) =>
      covenant.actionCreators.meow(whoMeowed)
  })
}

module.exports = {
  covenantName,
  actionCreators
}
