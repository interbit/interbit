const { ACTION_PREFIX } = require('./constants')

const actionTypes = {
  TOGGLE_RAW: `${ACTION_PREFIX}/TOGGLE_RAW`,
  SET_SELECTED_BLOCK_HASH: `${ACTION_PREFIX}/SET_SELECTED_BLOCK_HASH`,
  SET_SELECTED_CHAIN: `${ACTION_PREFIX}/SET_CHAIN`
}

const actionCreators = {
  toggleRawData: () => ({
    type: actionTypes.TOGGLE_RAW,
    payload: null
  }),

  setSelectedBlockHash: hash => ({
    type: actionTypes.SET_SELECTED_BLOCK_HASH,
    payload: {
      hash
    }
  }),

  setSelectedChain: chainAlias => ({
    type: actionTypes.SET_SELECTED_CHAIN,
    payload: {
      chainAlias
    }
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
