const formActionCreator = type => payload => ({
  type,
  payload
})

export default covenant => {
  const { actionCreators } = covenant

  const fields = Object.values(actionCreators).reduce(
    (accum, actionCreator) => {
      const action = actionCreator({})
      return {
        ...accum,
        [action.type]: {
          actionCreator: action.invoke || formActionCreator(action.type),
          payloadFields: Object.keys(action.arguments || action.payload)
        }
      }
    },
    {}
  )

  return fields
}
