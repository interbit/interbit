const { ACTION_PREFIX } = require('./constants')

const actionTypes = {
  SHOW_RAW_STATE: `${ACTION_PREFIX}/SHOW_RAW_STATE`,
  SELECT_BLOCK: `${ACTION_PREFIX}/SELECT_BLOCK`,
  SELECT_CHAIN: `${ACTION_PREFIX}/SELECT_CHAIN`
}

const actionCreators = {
  showRawState: showRawState => ({
    type: actionTypes.SHOW_RAW_STATE,
    payload: {
      showRawState
    }
  }),

  selectBlock: hash => ({
    type: actionTypes.SELECT_BLOCK,
    payload: {
      hash
    }
  }),

  selectChain: chainAlias => ({
    type: actionTypes.SELECT_CHAIN,
    payload: {
      chainAlias
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
