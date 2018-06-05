const {
  updateIndexHtmls,
  updateDom,
  camelCaseToHyphenated
} = require('./updateIndexHtml')
const watchCovenants = require('./watchCovenants')
const writeJsonFile = require('./writeJsonFile')

module.exports = {
  camelCaseToHyphenated,
  updateDom,
  updateIndexHtmls,
  watchCovenants,
  writeJsonFile
}
