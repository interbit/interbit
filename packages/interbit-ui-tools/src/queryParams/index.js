const base64url = require('base64-url')

const parseState = state => JSON.parse(base64url.decode(state))

const packState = (state, whiteList) =>
  base64url.encode(JSON.stringify(state, whiteList))

module.exports = {
  parseState,
  packState
}
