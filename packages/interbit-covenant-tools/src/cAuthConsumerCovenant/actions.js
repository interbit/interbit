const {
  validate,
  objectValidationRules: { required, chainIdPattern }
} = require('../validate')

const { ACTION_PREFIX } = require('./constants')

const actionTypes = {
  // Complete cAuth loop sharing requested profile information
  AUTHORIZED: `${ACTION_PREFIX}/AUTHORIZED`
}

const actionCreators = {
  // Public actions that can be invoked by clients
  authorized: ({ providerChainId, joinName }) => ({
    type: actionTypes.AUTHORIZED,
    payload: validate(
      { providerChainId, joinName },
      { providerChainId: chainIdPattern(), joinName: required() }
    )
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
