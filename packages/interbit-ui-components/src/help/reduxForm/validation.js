// TODO: Predicates that take a value (e.g. minLength) don't work properly via a redux store, because the code
// is serialized into the store.  Could change validation to an array of keys & values eg: [['required'], ['minLength', 6]]
// which would leave the code out of the store

export function email(value) {
  if (
    !(value === undefined || value === null || value === '') &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
  ) {
    return 'Invalid email address'
  }
  return undefined
}

export function required(value) {
  if (value === undefined || value === null || value === '') {
    return 'Required'
  }
  return undefined
}

export function minLength(min) {
  return value => {
    if (
      !(value === undefined || value === null || value === '') &&
      value.length < min
    ) {
      return `Must be at least ${min} characters`
    }
    return undefined
  }
}

export function maxLength(max) {
  return value => {
    if (
      !(value === undefined || value === null || value === '') &&
      value.length > max
    ) {
      return `Must be no more than ${max} characters`
    }
    return undefined
  }
}

export function integer(value) {
  if (
    !(value === undefined || value === null || value === '') &&
    !Number.isInteger(Number(value))
  ) {
    return 'Must be an integer'
  }
  return undefined
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match'
      }
    }
    return undefined
  }
}

export function createFieldValidator(validators) {
  return (value, allValues, props) => {
    if (validators) {
      for (let i = 0; i < validators.length; i += 1) {
        const validator = validators[i]
        if (typeof validator === 'function') {
          const result = validators[i](value, allValues, props)
          if (result) {
            return result
          }
        }
      }
    }
    return undefined
  }
}
