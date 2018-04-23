const getChainDataFromDocument = document => {
  const interbit = document.getElementById('interbit')
  const attributes = interbit.getAttributeNames()

  const chainData = {
    chains: {},
    covenants: {}
  }

  attributes.forEach(attr => {
    if (attr.startsWith('data-chain-id')) {
      const chainName = attr.substr(14)
      chainData.chains[chainName] = interbit.getAttribute(attr)
    }

    if (attr.startsWith('data-covenant-hash')) {
      const covenantName = attr.substr(19)
      chainData.covenants[covenantName] = interbit.getAttribute(attr)
    }

    if (attr === 'data-peer-hints') {
      chainData.peers = interbit.getAttribute(attr).split(',')
    }

    if (attr === 'data-boot-react-app') {
      chainData.bootReactApp = interbit.getAttribute(attr)
    }
  })

  return chainData
}

module.exports = getChainDataFromDocument
