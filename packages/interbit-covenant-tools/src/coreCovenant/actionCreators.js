const { createAction } = require('interbit-covenant-utils')

const { DEPLOY_COVENANT } = require('./actionTypes')

const actionCreators = {
  applyCovenant: ({ covenantHash }) =>
    createAction(DEPLOY_COVENANT, { covenantHash })
}

module.exports = actionCreators
