import React from 'react'
import { FormControl, Checkbox } from 'react-bootstrap'

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
