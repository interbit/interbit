import assert from 'assert'
import validation from '../components/ReduxForm/validation'

describe('ReduxForm component', () => {
  describe('IbField component', () => {
    // TODO #694: implement the following tests
    it('renders an <input type="text" /> when type="text"', () => {})
    it('renders a <select /> and <option />s when type="select"', () => {})
    it('renders a <select multiple /> and <option />s when type="select" and multiple={true}', () => {})
    it('renders an <input type="checkbox" /> when type="checkbox"', () => {})
    it('renders an <input type="radio" /> when type="radio"', () => {})
  })

  describe('Validation functions', () => {
    it('checks for valid email formats in validation.email', () => {
      const validEmails = ['meow@meow.com']
      const validEmptyValues = ['', undefined, null]
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
      validEmptyValues.forEach(val => {
        assert.strictEqual(validation.email(val), undefined)
      })
      invalidEmails.forEach(email => {
        assert.strictEqual(validation.email(email), 'Invalid email address.')
      })
    })

    it('checks for finite numbers in validation.number', () => {
      const validValues = [0, 100, 100.0, '100', '100.1', '-10', '0x11']
      const validEmptyValues = [undefined, null, '']
      const invalidValues = [
        false,
        true,
        'meow',
        [],
        {},
        NaN,
        Number.POSITIVE_INFINITY,
        Number.NEGATIVE_INFINITY
      ]

      validValues.forEach(val => {
        assert.strictEqual(validation.number(val), undefined)
      })
      validEmptyValues.forEach(val => {
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
})
