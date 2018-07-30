const {
  providing: getProviding,
  consuming: getConsuming,
  acl: getAcl,
  actionPermissions: getActionPermissions,
  paths
} = require('../selectors')

const REMOVE_JOIN_CONFIG = '@@interbit/REMOVE_JOIN_CONFIG'

// NOTE
// there are two corresponding joins to achieve the write join
// there is a sent-actions queue to the tochainID in the providing side named 'WRITE-JOIN-ACTION-STATUS'
// there is also a  WRITE-JOIN-PENDING-ACTIONS share open being shared in sent-actions
const revokeSendActions = (state, chainId) => {
  const nextState = state
  return nextState
}

// NOTE
// there are two corresponding joins to achieve the write join
// a WRITE-JOIN-ACTION-STATUS and WRITE-JOIN-PENDING-ACTIONS that mount in received actions / * / chainID
// There are also action permissions setup with a corresponding role in the ACL
const revokeReceiveActions = (state, chainId) => {
  const nextState = state
  return nextState
}

module.exports = {
  revokeReceiveActions,
  revokeSendActions
}
