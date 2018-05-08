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
  createAction
} = require('interbit-covenant-utils')

const {
  manifestCovenant,
  rootCovenant,
  rootStateSelectors
} = require('./rootCovenant')

const cAuthConsumerCovenant = require('./cAuthConsumerCovenant')

const mergeCovenants = require('./mergeCovenants')

const selectors = require('./selectors')

const {
  validate,
  objectValidationRules,
  rulePredicates
} = require('./validate')

module.exports = {
  createAction,
  coreCovenant: {
    actionTypes,
    actionCreators: {
      authorizeReceiveActions,
      authorizeSendActions,
      startConsumeState,
      startProvideState,
      setAcl,
      addToAcl,
      createChildChain,
      sponsorChainRequest,
      sponsorChain
    },
    constants,
    redispatch,
    redispatches,
    removeRedispatches,
    remoteRedispatch,
    shiftRedispatchQueue,
    pushUpRedispatches,
    selectors
  },
  manifestCovenant,
  rootCovenant,
  rootStateSelectors,
  cAuthConsumerCovenant,
  mergeCovenants,
  validate,
  objectValidationRules,
  rulePredicates
}
