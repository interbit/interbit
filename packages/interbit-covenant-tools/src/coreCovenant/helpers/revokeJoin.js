const revokeReadJoin = require('./revokeReadJoin')
const { revokeSendActions, revokeReceiveActions } = require('./revokeWriteJoin')

module.exports = {
  revokeReadJoin,
  stopConsumeState: revokeReadJoin,
  stopProvideState: revokeReadJoin,
  revokeSendActions,
  revokeReceiveActions
}
