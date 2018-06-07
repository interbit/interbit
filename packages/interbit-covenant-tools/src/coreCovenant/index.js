// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  redispatch,
  redispatches,
  removeRedispatches,
  remoteRedispatch,
  shiftRedispatchQueue,
  pushUpRedispatches,
  actionTypes,
  constants,
  startProvideState,
  startConsumeState,
  sponsorChainRequest,
  sponsorChain,
  setAcl,
  addToAcl,
  authorizeReceiveActions,
  authorizeSendActions,
  createChildChain,
  destroy
} = require('interbit-covenant-utils')

const { DEPLOY_COVENANT } = require('./actionTypes')
const { applyCovenant } = require('./actionCreators')
const selectors = require('./selectors')

module.exports = {
  actionTypes: { ...actionTypes, DEPLOY_COVENANT },
  actionCreators: {
    authorizeReceiveActions,
    authorizeSendActions,
    startConsumeState,
    startProvideState,
    setAcl,
    addToAcl,
    createChildChain,
    sponsorChainRequest,
    sponsorChain,
    destroy,
    applyCovenant
  },
  constants,
  redispatch,
  redispatches,
  removeRedispatches,
  remoteRedispatch,
  shiftRedispatchQueue,
  pushUpRedispatches,
  selectors
}
