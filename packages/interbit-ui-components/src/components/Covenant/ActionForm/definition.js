import { defineElement } from '../../../help/reduxForm/definition'

export const buildDefinition = (payloadFields, isConnected) => {
  const definition = payloadFields.map(covenantField =>
    defineElement(covenantField, covenantField, { readOnly: !isConnected })
  )

  return definition
}
