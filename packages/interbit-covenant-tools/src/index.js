// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { createAction } = require('interbit-covenant-utils')

const coreCovenant = require('./coreCovenant')

const {
  manifestCovenant,
  rootCovenant,
  rootStateSelectors
} = require('./rootCovenant')

const cAuthConsumerCovenant = require('./cAuthConsumerCovenant')

const mergeCovenants = require('./mergeCovenants')

const {
  validate,
  objectValidationRules,
  rulePredicates
} = require('./validate')

module.exports = {
  createAction,
  coreCovenant,
  manifestCovenant,
  rootCovenant,
  rootStateSelectors,
  cAuthConsumerCovenant,
  mergeCovenants,
  validate,
  objectValidationRules,
  rulePredicates
}
