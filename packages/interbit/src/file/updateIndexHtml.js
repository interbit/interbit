const fs = require('fs-extra')
const cheerio = require('cheerio')
const {
  config: {
    selectors: { getApps }
  }
} = require('interbit-covenant-tools')

const log = require('../log')

/**
 * Updates the index.html files in the configured applications with their
 * configured peers and chain Ids so that browser nodes know how to connect
 * to the network.
 * @param {Object} params - Params object
 * @param {Object} params.config - The interbit configuration specifying apps config
 * @param {Object} params.chains - The chain alias to chain ID map to use
 */
const updateIndexHtmls = ({ config, chains }) => {
  log.info({ config, chains })
  const apps = getApps(config)
  if (!apps) {
    return
  }

  const appsList = Object.entries(apps)

  appsList.forEach(([appName, appConfig]) => {
    updateIndexHtml({ appConfig, chains })
  })
}

const updateIndexHtml = ({ appConfig, chains }) => {
  log.info(appConfig)
  const indexHtmlFilepath = appConfig.indexLocation

  log.info('Updating index.html with chain data...', indexHtmlFilepath)
  const indexHtml = fs.readFileSync(indexHtmlFilepath).toString()

  const dom = cheerio.load(indexHtml)
  updateDom(dom, appConfig, chains)

  const updatedIndexHtml = `<!DOCTYPE html>\n${dom(':root').toString()}`
  fs.writeFileSync(indexHtmlFilepath, updatedIndexHtml)

  log.success('Finished updating index.html with chain IDs')
}

const updateDom = (dom, appConfig, chains) => {
  const interbitElement = dom('#interbit')
  if (!interbitElement.length) {
    log.error('ERR index.html must contain a <script> tag with [id="interbit"]')
    return
  }

  stripChainAttrs(interbitElement)
  insertChainsInDom(interbitElement, appConfig, chains)
  updateMetadata(interbitElement, appConfig)
}

const stripChainAttrs = interbitElement => {
  const interbitData = interbitElement.data()
  const chainIdDataAttrs = Object.keys(interbitData).filter(
    attr => attr.startsWith('chainId') || attr.startsWith('covenant')
  )
  chainIdDataAttrs.forEach(chainIdDataAttr => {
    const dataAttr = camelCaseToHyphenated(chainIdDataAttr)
    interbitElement.attr(`data-${dataAttr}`, null)
  })
}

const insertChainsInDom = (interbitElement, appConfig, chains) => {
  if (!chains) {
    log.error('No chains have been deployed to your node')
    return
  }

  appConfig.chains.forEach(chainAlias => {
    interbitElement.attr(
      `data-chain-id-${camelCaseToHyphenated(chainAlias)}`,
      chains[chainAlias]
    )
  })
}

const updateMetadata = (interbitElement, appConfig) => {
  const { peers } = appConfig
  if (!peers) {
    log.warn(
      'Interbit configuration file does not contain any peers for one of its apps'
    )
  } else {
    interbitElement.attr('data-peer-hints', peers.toString())
  }
}

const camelCaseToHyphenated = s =>
  s.replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`).replace(/^_/, '')

module.exports = {
  updateIndexHtmls,
  updateDom,
  camelCaseToHyphenated
}
