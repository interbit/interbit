const covenantName = 'template-private'

const actionTypes = {
  MEMO: `${covenantName}/MEMO`,
  ADD: `${covenantName}/ADD`
}

// Export a proxy so an exception is thrown in case an undefined property is accessed
module.exports = new Proxy(actionTypes, {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop]
    }
    throw new Error(
      `Invalid action type "${prop}" in covenant "${covenantName}"`
    )
  }
})
