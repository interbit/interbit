// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const { createAction } = require('interbit-covenant-utils')

const coreCovenant = require('./coreCovenant')
const constants = require('./constants')

const { rootStateSelectors, rootCovenant } = require('./rootCovenant')

const cAuthConsumerCovenant = require('./cAuthConsumerCovenant')
const config = require('./config')
const manifest = require('./manifest')
const mergeCovenants = require('./mergeCovenants')

const {
  validate,
  objectValidationRules,
  rulePredicates
} = require('./validate')

module.exports = {
  createAction,
  config,
  constants,
  coreCovenant,
  manifest,
  rootCovenant,
  rootStateSelectors,
  cAuthConsumerCovenant,
  mergeCovenants,
  validate,
  objectValidationRules,
  rulePredicates
}
