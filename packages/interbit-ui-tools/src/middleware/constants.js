const ACTION_PREFIX = 'interbit-middleware'
const LOG_PREFIX = 'interbit-middleware'

const ACL = 'acl'
const BLOCK_MASTER = 'blockMaster'
const BOOT_REACT_APP = 'bootReactApp'
const CHAINS = 'chains'
const CHAIN_DATA = 'chainData'
const CHAIN_ID = 'chainId'
const CLI = 'cli'
const CONFIG = 'config'
const COVENANT_HASH = 'covenantHash'
const ERROR = 'error'
const HYPERVISOR = 'hypervisor'
const INTERBIT = 'interbit'
const PEERS = 'peers'
const PUBLIC_KEY = 'publicKey'
const ROLES = 'roles'
const SPONSOR_CONFIG = 'privateChainHosting'
const SPONSOR_REQUESTS = 'sponsorRequests'
const STATUS = 'status'
const VERSION = 'version'
const INTERBIT_REDUCER_KEY = 'interbit'

const DATASTORE_KEYS = {
  KEY_PAIR: 'interbit-keypair'
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
  UNLOADING: 'UNLOADING',
  UNLOADED: 'UNLOADED',
  UNSUBSCRIBED: 'UNSUBSCRIBED',
  BLOCKING: 'BLOCKING',
  ERROR: 'ERROR',
  DELETING: 'DELETING',
  UNKNOWN: 'UNKNOWN'
}

const INTERBIT_PATHS = {
  BLOCK_MASTER: [INTERBIT, CONFIG, BLOCK_MASTER],
  CHAIN_ID: [INTERBIT, CHAIN_ID],
  ROLES: [INTERBIT, CONFIG, ACL, ROLES]
}

module.exports = {
  ACTION_PREFIX,
  LOG_PREFIX,
  ACL,
  BLOCK_MASTER,
  BOOT_REACT_APP,
  CHAINS,
  CHAIN_DATA,
  CHAIN_ID,
  CLI,
  CONFIG,
  COVENANT_HASH,
  ERROR,
  HYPERVISOR,
  INTERBIT,
  PEERS,
  PUBLIC_KEY,
  ROLES,
  SPONSOR_CONFIG,
  SPONSOR_REQUESTS,
  STATUS,
  VERSION,
  INTERBIT_REDUCER_KEY,
  DATASTORE_KEYS,
  INTERBIT_PATHS,
  INTERBIT_STATUS,
  CHAIN_STATUS
}
