import { required } from './validation'

// Creates a valid DefinitionType instance used to render forms
export function defineElement(label, key, params) {
  const options = {
    type: 'text',
    readOnly: false,
    validators: [required],
    selectPlaceholder: '',
    selectValues: [],
    ...params
  }
  return {
    label,
    key,
    ...options
  }
}
