const required = value => (value ? undefined : 'This field is required.')

const email = value =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? undefined
    : 'Invalid email address.'

export default {
  required,
  email
}
