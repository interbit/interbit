const { getInterbit, waitForInterbit, isInterbitLoaded } = require('./context')
const getHtmlConfig = require('./staticHtml')

const getConfig = async () => getHtmlConfig(document)

module.exports = {
  getConfig,
  getInterbit,
  waitForInterbit,
  isInterbitLoaded
}
