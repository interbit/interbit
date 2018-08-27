const { getInterbit, waitForInterbit, isInterbitLoaded } = require('./context')
const getHtmlConfig = require('./staticHtml')

const getConfig = async () => getHtmlConfig(document)

const getDefaultPort = () => {
  const protocol =
    window && window.location && window.location.protocol
      ? window.location.protocol
      : 'https'

  return protocol === 'https:' ? 443 : 80
}

module.exports = {
  getConfig,
  getDefaultPort,
  getInterbit,
  waitForInterbit,
  isInterbitLoaded
}
