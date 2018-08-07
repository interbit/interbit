const middlewareConstants = require('../constants')

const DOM = {
  INTERBIT: 'interbit',
  CHAIN_ID_PREFIX: 'data-chain-id-',
  PEERS: 'data-peer-hints',
  BOOT_REACT_APP: 'data-boot-react-app'
}

module.exports = {
  ...middlewareConstants,
  DOM
}
