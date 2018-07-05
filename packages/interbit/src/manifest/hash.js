const objectHash = require('object-hash')
const stringify = require('json-stable-stringify')

const hash = obj => objectHash(stringify(obj))

module.exports = hash
