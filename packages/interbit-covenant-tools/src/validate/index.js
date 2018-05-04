// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const isNullOrUndefined = value => value === undefined || value === null

const isUndefined = value => typeof value === 'undefined'

const isString = value => typeof value === 'string' || value instanceof String

const isNumeric = value => typeof value === 'number' && Number.isFinite(value)

const isBoolean = value => typeof value === 'boolean'

const isObject = value =>
  value && typeof value === 'object' && value.constructor === Object

const isArray = value => Array.isArray(value)

const isFunction = value => typeof value === 'function'

const isRegExp = value =>
  value && typeof value === 'object' && value.constructor === RegExp

const isValidRuleSet = rules =>
  isObject(rules) && Object.values(rules).every(rule => isFunction(rule))

const propertyValue = (obj, property) => {
  if (!isObject(obj)) {
    throw new Error(`not a valid object`)
  }
  return obj[property]
}

const equalTo = (value, msg) => (obj, property) => {
  if (value !== propertyValue(obj, property)) {
    throw new Error(msg || `${property} is not equal to "${value}"`)
  }
}

const required = msg => (obj, property) => {
  if (isNullOrUndefined(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is null or undefined`)
  }
}

const defined = msg => (obj, property) => {
  if (isUndefined(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is undefined`)
  }
}

const string = msg => (obj, property) => {
  if (!isString(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is not a string`)
  }
}

const numeric = msg => (obj, property) => {
  if (!isNumeric(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is not numeric`)
  }
}

const boolean = msg => (obj, property) => {
  if (!isBoolean(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is not boolean`)
  }
}

const array = msg => (obj, property) => {
  if (!isArray(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is not an array`)
  }
}

const object = msg => (obj, property) => {
  if (!isObject(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is not an object`)
  }
}

const func = msg => (obj, property) => {
  if (!isFunction(propertyValue(obj, property))) {
    throw new Error(msg || `${property} is not a function`)
  }
}

const condition = (predicate, msg) => {
  if (!isFunction(predicate)) {
    throw new Error(`predicate is not a function`)
  }
  return (obj, property) => {
    if (!predicate(propertyValue(obj, property))) {
      throw new Error(msg || `${property} is invalid`)
    }
  }
}

const matches = (regex, msg, ctxtMsg = 'is invalid') => {
  if (!isRegExp(regex)) {
    throw new Error(`regex is not a regular expression`)
  }
  return (obj, property) => {
    const value = propertyValue(obj, property)
    if (isUndefined(value) || !regex.test(value)) {
      throw new Error(msg || `${property} ${ctxtMsg}`)
    }
  }
}

const emailAddressRegex = /(\w(=?@)\w+\.{1}[a-zA-Z]{1,})/i

const emailAddress = msg =>
  matches(emailAddressRegex, msg, 'is not a valid email address')

const faIconRegex = /^fa(-[a-z0-9]+)+$/

const faIconPattern = msg =>
  matches(faIconRegex, msg, 'is not a valid Font Awesome icon')

const chainIdRegex = /^[0-9a-f]{64}$/

const chainIdPattern = msg =>
  matches(chainIdRegex, msg, 'is not a valid chain ID')

/**
 * Validate an object
 * @param {*} obj Object to validate
 * @param {*} rules Validation rules
 */
const validate = (obj, rules) => {
  if (!isObject(obj)) {
    throw new Error(`not an object, cannot validate`)
  }
  if (!isValidRuleSet(rules)) {
    throw new Error(`not a valid rule set, cannot validate`)
  }

  Object.entries(rules).forEach(rule => {
    const property = rule[0]
    const testMethod = rule[1]
    testMethod(obj, property)
  })

  return obj
}

const objectValidationRules = {
  required,
  defined,
  matches,
  boolean,
  string,
  numeric,
  object,
  array,
  emailAddress,
  faIconPattern,
  chainIdPattern,
  condition,
  equalTo,
  func
}

const rulePredicates = {
  isNullOrUndefined,
  isUndefined,
  isString,
  isNumeric,
  isBoolean,
  isObject,
  isArray
}

module.exports = {
  validate,
  objectValidationRules,
  rulePredicates
}
