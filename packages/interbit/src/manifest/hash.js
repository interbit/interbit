const objectHash = require('object-hash')
const stringify = require('json-stringify-deterministic')

const hash = obj => objectHash(stringify(obj))

module.exports = hash
