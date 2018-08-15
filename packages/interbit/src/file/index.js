const {
  updateIndexHtmls,
  updateDom,
  camelCaseToHyphenated
} = require('./updateIndexHtml')
const { packCovenants } = require('./packCovenants')
const watchCovenants = require('./watchCovenants')
const writeJsonFile = require('./writeJsonFile')

module.exports = {
  camelCaseToHyphenated,
  packCovenants,
  updateDom,
  updateIndexHtmls,
  watchCovenants,
  writeJsonFile
}
