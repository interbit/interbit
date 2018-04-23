const Immutable = require('seamless-immutable')
const {
  LOG_PREFIX,
  DOM,
  CHAIN_DATA,
  CHAIN_STATUS,
  PEERS,
  BOOT_REACT_APP
} = require('./constants')

const getHtmlConfig = document => {
  const empty = Immutable.from({})

  const interbitElement = document.getElementById(DOM.INTERBIT)
  if (!interbitElement) {
    console.error(
      `${LOG_PREFIX}: Cannot find element with id="interbit" to load chains from.`
    )
    return empty
  }

  const attributes = interbitElement.getAttributeNames()

  const interbitConfig = attributes.reduce((config, attr) => {
    if (attr.startsWith(DOM.CHAIN_ID_PREFIX)) {
      const chainAlias = aliasFromAttribute(attr, DOM.CHAIN_ID_PREFIX)
      const chainId = interbitElement.getAttribute(attr)
      return config.setIn([CHAIN_DATA, chainAlias], {
        chainId,
        status: CHAIN_STATUS.PENDING
      })
    }

    if (attr === DOM.PEERS) {
      const value = interbitElement.getAttribute(attr)
      if (value) {
        return config.set(PEERS, value.split(','))
      }
    }

    if (attr === DOM.BOOT_REACT_APP) {
      const value = interbitElement.getAttribute(attr)
      if (value) {
        return config.set(BOOT_REACT_APP, value)
      }
    }
    return config
  }, empty)

  return interbitConfig
}

const aliasFromAttribute = (attr, prefix) =>
  hyphenatedToCamelCase(attr.substr(prefix.length))

const hyphenatedToCamelCase = s =>
  s.replace(/-([a-z])/g, x => x[1].toUpperCase())

module.exports = getHtmlConfig
