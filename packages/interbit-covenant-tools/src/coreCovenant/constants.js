const INTERBIT = 'interbit'
const CONFIG = 'config'
const ACL = 'acl'

const PATHS = {
  CHAIN_ID: [INTERBIT, 'chainId'],
  CONFIG: [INTERBIT, CONFIG],
  CONSUMING: [INTERBIT, CONFIG, 'consuming'],
  PROVIDING: [INTERBIT, CONFIG, 'providing'],
  ACL: [INTERBIT, CONFIG, ACL],
  ACTION_PERMISSIONS: [INTERBIT, CONFIG, ACL, 'actionPermissions'],
  ROLES: [INTERBIT, CONFIG, ACL, 'roles'],
  SENT_ACTIONS: [INTERBIT, 'sent-actions'],
  PENDING_ACTIONS: ['pending-actions'],
  COVENANT_HASH: [INTERBIT, CONFIG, 'covenantHash']
}

module.exports = {
  PATHS
}
