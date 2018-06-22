const ansi  = require('ansi-escape-sequences')
const color = ansi.style

var DEBUG  = false
var PREFIX = 'DEBUG'

const out = (msg) => {
  const d = module.exports.DEBUG
  const p = module.exports.PREFIX
  if (d) console.log(`${color.blue}${p}: ${msg}${color.reset}`)
}

module.exports = { out, DEBUG, PREFIX }
