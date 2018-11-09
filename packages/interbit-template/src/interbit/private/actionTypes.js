const covenantName = 'template-private'

const actionTypes = {
  MEMO: `${covenantName}/MEMO`,
  ADD: `${covenantName}/ADD`,
  // Set the timestamp with a known value
  SET_TIMESTAMP: `${covenantName}/SET_TIMESTAMP`,
  // Trigger a saga to obtain the current timestamp
  // Obtain the current timestamp as a side-effect
  CURRENT_TIMESTAMP_SAGA: `${covenantName}/CURRENT_TIMESTAMP_SAGA`
}

module.exports = actionTypes
