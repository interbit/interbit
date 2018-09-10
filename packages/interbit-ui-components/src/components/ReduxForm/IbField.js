import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormControl, Checkbox } from 'react-bootstrap'
import { Field } from 'redux-form'

// eslint-disable-next-line
export const renderInputNew = ({onChange, props, label, placeholder, type, input, meta: {touched, error, warning}}) => (
  <div className={touched && error ? 'field-error' : ''}>
    {type === 'checkbox' ? (
      <Checkbox placeholder={placeholder} {...input}>
        {label}
      </Checkbox>
    ) : (
      <FormControl placeholder={placeholder} type={type} {...input} />
    )}
    {touched &&
      ((error && <span className="error-msg">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)

export default class IbField extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.func)
  }

  static defaultProps = {
    placeholder: '',
    validate: []
  }

  render() {
    const { type, name, placeholder, validate } = this.props

    return (
      <Field
        name={name}
        type={type}
        validate={validate}
        component={renderInputNew}
        placeholder={placeholder}
      />
    )
  }
}
