const email = value => {
  const error = 'Invalid email address.'
  if (
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ||
    value === undefined ||
    value === null ||
    value === ''
  ) {
    return undefined
  }
  return error
}

const number = value => {
  const error = 'Must be a number.'

  if (
    typeof value === 'object' ||
    typeof value === 'boolean' ||
    Number.isNaN(Number(value)) ||
    !Number.isFinite(value)
  ) {
    return error
  }
  return undefined
}

const required = value => {
  const error = 'This field is required.'

  if (isEmptyObject(value)) {
    return error
  }
  if (value || value === 0 || value === false) {
    return undefined
  }
  return error
}

// Helpers
const isEmptyObject = obj => {
  if (typeof obj !== 'object') {
    return false
  }
  for (const key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

export default {
  email,
  number,
  required
}
