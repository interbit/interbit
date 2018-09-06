import React from 'react'
import { FormControl } from 'react-bootstrap'

// eslint-disable-next-line
export const renderInputNew = ({onChange, props, placeholder, type, input, meta: {touched, error, warning}}) => (
  <div className={touched && error ? 'field-error' : ''}>
    <FormControl placeholder={placeholder} type={type} {...input} />
    {touched &&
      ((error && <span className="error-msg">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)
