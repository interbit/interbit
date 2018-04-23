const fs = require('fs-extra')
const cheerio = require('cheerio')
const { getApps, getPeers } = require('../config/configSelectors')

const updateIndexHtmls = ({ config, chains }) => {
  console.log({ config, chains })
  const apps = getApps(config)
  const appsList = Object.entries(apps)
  const peers = getPeers(config)

  appsList.forEach(([appName, appConfig]) => {
    updateIndexHtml({ appConfig, peers, chains })
  })
}

const updateIndexHtml = ({ appConfig, peers, chains }) => {
  console.log(appConfig)
  const indexHtmlFilepath = appConfig.indexLocation

  console.log('Updating index.html with chain data...', indexHtmlFilepath)
  const indexHtml = fs.readFileSync(indexHtmlFilepath).toString()

  const dom = cheerio.load(indexHtml)
  updateDom(dom, appConfig, peers, chains)

  const updatedIndexHtml = `<!DOCTYPE html>\n${dom(':root').toString()}`
  fs.writeFileSync(indexHtmlFilepath, updatedIndexHtml)

  console.log('Finished updating index.html with chain IDs')
}

const updateDom = (dom, appConfig, peers, chains) => {
  const interbitElement = dom('#interbit')
  if (!interbitElement.length) {
    console.error(
      'ERR index.html must contain a <script> tag with [id="interbit"]'
    )
    return
  }

  stripChainAttrs(interbitElement)
  insertChainsInDom(interbitElement, appConfig, chains)
  updateMetaData(interbitElement, appConfig, peers)
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
    console.error('No chains have been deployed to your node')
    return
  }

  appConfig.chains.forEach(chainAlias => {
    interbitElement.attr(
      `data-chain-id-${camelCaseToHyphenated(chainAlias)}`,
      chains[chainAlias]
    )
  })
}

const updateMetaData = (interbitElement, appConfig, peers) => {
  if (!peers) {
    console.error('Interbit configuration file must contain a list of peers')
  } else {
    interbitElement.attr('data-peer-hints', peers.toString())
  }

  const appChain = appConfig.appChain
  if (!appChain) {
    console.error('App configuration file must specify an appChain')
  } else {
    interbitElement.attr('data-boot-react-app', appChain)
  }
}

const camelCaseToHyphenated = s =>
  s.replace(/\.?([A-Z]+)/g, (x, y) => `-${y.toLowerCase()}`).replace(/^_/, '')

module.exports = {
  updateIndexHtmls,
  updateDom,
  camelCaseToHyphenated
}
