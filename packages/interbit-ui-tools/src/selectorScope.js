const Immutable = require('seamless-immutable')

const emptyObject = Immutable.from({})

const isImmutableObject = state =>
  state && typeof state === 'object' && Immutable.isImmutable(state)

const immutable = state =>
  isImmutableObject(state) ? state : Immutable.from(state || {})

const entireTree = state => immutable(state)

module.exports = {
  emptyObject,
  immutable,
  entireTree,
  isImmutableObject
}
