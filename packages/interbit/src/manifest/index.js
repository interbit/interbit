const { generateManifest } = require('./generateManifest')
const {
  manifest: { selectors }
} = require('interbit-covenant-tools')

module.exports = {
  generateManifest,
  manifestSelectors: selectors
}
