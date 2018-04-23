const ACTION_PREFIX = 'interbit-middleware'
const LOG_PREFIX = 'interbit-middleware'

// Chain aliases
const PUBLIC_CHAIN_ALIAS = 'public'
const PRIVATE_CHAIN_ALIAS = 'private'

const BLOCK_MASTER = 'blockMaster'
const BOOT_REACT_APP = 'bootReactApp'
const CHAINS = 'chains'
const CHAIN_DATA = 'chainData'
const CHAIN_ID = 'chainId'
const CLI = 'cli'
const CONFIG = 'config'
const CONNECTION = 'connection'
const COVENANT_HASH = 'covenantHash'
const COVENANTS = 'covenants'
const ERROR = 'error'
const HYPERVISOR = 'hypervisor'
const INTERBIT = 'interbit'
const PEERS = 'peers'
const PUBLIC_KEY = 'publicKey'
const SPONSOR_CONFIG = 'privateChainHosting'
const SPONSOR_REQUESTS = 'sponsorRequests'
const STATUS = 'status'

const INTERBIT_REDUCER_KEY = 'interbit'

const DOM = {
  INTERBIT: 'interbit',
  CHAIN_ID_PREFIX: 'data-chain-id-',
  PEERS: 'data-peer-hints',
  BOOT_REACT_APP: 'data-boot-react-app'
}

const INTERBIT_STATUS = {
  PENDING: 'PENDING',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  READY: 'READY',
  ERROR: 'ERROR',
  UNKNOWN: 'UNKNOWN'
}

const CHAIN_STATUS = {
  PENDING: 'PENDING',
  SPONSORING: 'SPONSORING',
  GENESIS: 'GENESIS',
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  SUBSCRIBED: 'SUBSCRIBED',
  BLOCKING: 'BLOCKING',
  ERROR: 'ERROR',
  UNKNOWN: 'UNKNOWN'
}

module.exports = {
  ACTION_PREFIX,
  LOG_PREFIX,
  PUBLIC_CHAIN_ALIAS,
  PRIVATE_CHAIN_ALIAS,
  BLOCK_MASTER,
  BOOT_REACT_APP,
  CHAINS,
  CHAIN_DATA,
  CHAIN_ID,
  CLI,
  CONFIG,
  CONNECTION,
  COVENANT_HASH,
  COVENANTS,
  ERROR,
  HYPERVISOR,
  INTERBIT,
  PEERS,
  PUBLIC_KEY,
  SPONSOR_CONFIG,
  SPONSOR_REQUESTS,
  STATUS,
  INTERBIT_REDUCER_KEY,
  DOM,
  INTERBIT_STATUS,
  CHAIN_STATUS
}
