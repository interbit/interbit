import assert from 'assert'
import validation from '../help/newReduxForm/validation'

describe('redux-form validation functions', () => {
  it('checks for valid email formats in validation.email', () => {
    const validEmails = ['meow@meow.com', '', undefined, null]
    const invalidEmails = [
      'meow',
      '@meow',
      '.com',
      '@meow.com',
      'meow@meow',
      false,
      true,
      0,
      {}
    ]

    validEmails.forEach(email => {
      assert.strictEqual(validation.email(email), undefined)
    })
    invalidEmails.forEach(email => {
      assert.strictEqual(validation.email(email), 'Invalid email address.')
    })
  })

  it('checks for finite numbers in validation.number', () => {
    const validValues = [0, 100, 100.0]
    const invalidValues = [
      false,
      true,
      'meow',
      undefined,
      null,
      [],
      {},
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY,
      '100'
    ]

    validValues.forEach(val => {
      assert.strictEqual(validation.number(val), undefined)
    })
    invalidValues.forEach(val => {
      assert.strictEqual(validation.number(val), 'Must be a number.')
    })
  })

  it('checks for non-empty values in validation.required', () => {
    const validValues = ['meow', 0, true, false]
    const invalidValues = [undefined, null, {}, []]

    validValues.forEach(val => {
      assert.strictEqual(validation.required(val), undefined)
    })
    invalidValues.forEach(val => {
      assert.strictEqual(validation.required(val), 'This field is required.')
    })
  })
})
