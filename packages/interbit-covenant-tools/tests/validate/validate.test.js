const should = require('should')
const {
  validate,
  objectValidationRules: {
    required,
    matches,
    emailAddress,
    string,
    numeric,
    boolean,
    defined,
    object,
    array,
    faIconPattern,
    chainIdPattern,
    condition,
    equalTo,
    func
  }
} = require('../../src')

describe('validate', () => {
  const validInputs = [
    { input: {}, rules: {} },
    { input: { unchecked1: 'value', unchecked2: undefined }, rules: {} },
    { input: { name: 'fred' }, rules: { name: required() } },
    { input: { name: 'fred' }, rules: { name: matches(/^[A-Za-z]{4}$/) } },
    { input: { email: 'fred@btl.co' }, rules: { email: emailAddress() } },
    {
      input: { name: 'fred', email: 'fred@btl.co' },
      rules: { name: required(), email: emailAddress() }
    },
    {
      input: { name: 'fred', email: 'fred@btl.co', unchecked: 'value' },
      rules: { name: required(), email: emailAddress() }
    },
    { input: { prop: 'a string' }, rules: { prop: string() } },
    { input: { prop: '' }, rules: { prop: string() } },
    { input: { prop: 1 }, rules: { prop: numeric() } },
    { input: { prop: 356.121 }, rules: { prop: numeric() } },
    { input: { prop: true }, rules: { prop: boolean() } },
    { input: { prop: false }, rules: { prop: boolean() } },
    { input: { prop: null }, rules: { prop: defined() } },
    { input: { prop: {} }, rules: { prop: object() } },
    {
      input: { prop: 'string' },
      rules: { prop: condition(value => value.startsWith('str')) }
    },
    {
      input: { prop: [1, 2] },
      rules: { prop: condition(value => value.length === 2) }
    },
    {
      input: {
        chainId:
          '0123456789012345678901234567890123456789012345678901234567890123'
      },
      rules: { chainId: chainIdPattern() }
    },
    { input: { prop: [] }, rules: { prop: array() } },
    {
      input: { icon: 'fa-bookmark-0' },
      rules: { icon: faIconPattern() }
    },
    {
      input: { prop: 'fred' },
      rules: { prop: equalTo('fred') }
    },
    {
      input: { prop: () => 25 },
      rules: { prop: func() }
    }
  ]

  validInputs.forEach(testCase => {
    it(`valid input: validate (${JSON.stringify(
      testCase
    )}) does not throw`, () => {
      should(() => {
        validate(testCase.input, testCase.rules)
      }).not.throw()
    })
  })

  const invalidInputs = [
    {
      input: undefined,
      rules: undefined,
      msg: 'not an object, cannot validate'
    },
    { input: undefined, rules: {}, msg: 'not an object, cannot validate' },
    {
      input: {},
      rules: undefined,
      msg: 'not a valid rule set, cannot validate'
    },
    {
      input: {},
      rules: { name: 'not a function' },
      msg: 'not a valid rule set, cannot validate'
    },
    {
      input: { name: undefined },
      rules: { name: required() },
      msg: 'name is null or undefined'
    },
    {
      input: { name: undefined },
      rules: { name: required('arbitrary message') },
      msg: 'arbitrary message'
    },
    {
      input: { name: undefined },
      rules: { name: defined() },
      msg: 'name is undefined'
    },
    {
      input: { name: 'fred' },
      rules: { name: matches(/[A-Z]{4}/) },
      msg: 'name is invalid'
    },
    {
      input: { email: 'fred@btl' },
      rules: { email: emailAddress() },
      msg: 'email is not a valid email address'
    },
    {
      input: { name: 'fred', email: 'fred@btl' },
      rules: { name: required(), email: emailAddress() },
      msg: 'email is not a valid email address'
    },
    {
      input: { email: 'fred@btl.co' },
      rules: { name: required(), email: emailAddress() },
      msg: 'name is null or undefined'
    },
    {
      input: { prop: {} },
      rules: { prop: string() },
      msg: 'prop is not a string'
    },
    {
      input: { prop: 1 },
      rules: { prop: string() },
      msg: 'prop is not a string'
    },
    {
      input: {},
      rules: { prop: string() },
      msg: 'prop is not a string'
    },
    {
      input: { prop: '1' },
      rules: { prop: numeric() },
      msg: 'prop is not numeric'
    },
    {
      input: { prop: 'true' },
      rules: { prop: boolean() },
      msg: 'prop is not boolean'
    },
    {
      input: { prop: 'false' },
      rules: { prop: boolean() },
      msg: 'prop is not boolean'
    },
    {
      input: { prop: undefined },
      rules: { prop: defined() },
      msg: 'prop is undefined'
    },
    {
      input: { prop: 'string' },
      rules: { prop: array() },
      msg: 'prop is not an array'
    },
    {
      input: { prop: {} },
      rules: { prop: array() },
      msg: 'prop is not an array'
    },
    {
      input: { prop: 'string' },
      rules: { prop: object() },
      msg: 'prop is not an object'
    },
    {
      input: { prop: [] },
      rules: { prop: object() },
      msg: 'prop is not an object'
    },
    {
      input: { prop: 'abcdef' },
      rules: { prop: condition(value => value.startsWith('bc')) },
      msg: 'prop is invalid'
    },
    {
      input: { prop: [1, 2] },
      rules: { prop: condition(value => value.length === 3) },
      msg: 'prop is invalid'
    },
    {
      input: {
        chainId: '6cbfb8f6-f7ed-4455-aac7-1b251ac2581f'
      },
      rules: { chainId: chainIdPattern() },
      msg: 'chainId is not a valid chain ID'
    },
    {
      input: { icon: 'fa_bookmark_0' },
      rules: { icon: faIconPattern() },
      msg: 'icon is not a valid Font Awesome icon'
    },
    {
      input: { prop: 'decidedly not fred' },
      rules: { prop: equalTo('fred') },
      msg: 'prop is not equal to "fred"'
    },
    {
      input: { prop: '1' },
      rules: { prop: func() },
      msg: 'prop is not a function'
    }
  ]

  invalidInputs.forEach(testCase => {
    it(`invalid input: validate(${JSON.stringify(
      testCase
    )}) throws expected exception`, () => {
      should(() => {
        validate(testCase.input, testCase.rules)
      }).throw(testCase.msg)
    })
  })

  const invalidInputsToMatches = [undefined, null, 'string']

  invalidInputsToMatches.forEach(testCase => {
    it(`invalid construction: matches(${JSON.stringify(
      testCase
    )}) throws when parameter is not a RegExp`, () => {
      should(() => {
        matches(testCase)
      }).throw('regex is not a regular expression')
    })
  })

  const invalidInputsToCondition = [undefined, null, 'string']

  invalidInputsToCondition.forEach(testCase => {
    it(`invalid construction: condition(${JSON.stringify(
      testCase
    )}) throws when parameter is not a RegExp`, () => {
      should(() => {
        condition(testCase)
      }).throw('predicate is not a function')
    })
  })
})
