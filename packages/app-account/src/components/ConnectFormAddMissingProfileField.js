import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { Button, Table } from 'react-bootstrap'
import { IconButton, IbField, validation } from 'interbit-ui-components'

import formNames from '../constants/formNames'

export class ConnectFormAddMissingProfileField extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    isEditable: PropTypes.bool,
    missingFields: PropTypes.arrayOf(PropTypes.string),
    onCancel: PropTypes.func,
    profileFields: PropTypes.shape({}),
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    toggleForm: PropTypes.func.isRequired,
    valid: PropTypes.bool.isRequired
  }

  static defaultProps = {
    image: '',
    imageAlt: '',
    isEditable: false,
    missingFields: [],
    onCancel: undefined,
    profileFields: {},
    requestedTokens: [],
    title: ''
  }

  render() {
    const {
      image,
      imageAlt,
      isEditable,
      missingFields,
      onCancel,
      profileFields,
      requestedTokens,
      handleSubmit,
      title,
      toggleForm,
      valid
    } = this.props

    const fulfilledTokens = requestedTokens.filter(
      t => !missingFields.includes(t)
    )

    const viewForm = (
      <div>
        <Table>
          <tbody>
            {fulfilledTokens.map(field => (
              <tr key={field}>
                <td>{field}</td>
                <td>{profileFields[field]}</td>
              </tr>
            ))}
            {missingFields.map(field => (
              <tr key={field}>
                <td colSpan={2}>
                  <Button
                    className="text-button"
                    onClick={() => {
                      toggleForm(formNames.CAUTH_ADD_REQUESTED_TOKENS)
                    }}>
                    Add {field}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="btn-container">
          <IconButton text="Continue" className="disabled" />
          <IconButton
            text="Go Back"
            className="secondary"
            clickHandler={() => onCancel()}
          />
        </div>
      </div>
    )

    const editForm = (
      <form onSubmit={handleSubmit}>
        <Table>
          <tbody>
            {fulfilledTokens.map(field => (
              <tr key={`${field}-value`}>
                <td>{field}</td>
                <td>
                  {profileFields[field]}
                  <IbField name={field} type="hidden" />
                </td>
              </tr>
            ))}
            {missingFields.map(field => (
              <tr key={field}>
                <td colSpan={2} className="form-td">
                  <IbField
                    name={field}
                    placeholder={`Add ${field}`}
                    type={field === 'email' ? 'email' : 'text'}
                    validate={
                      field === 'email'
                        ? [validation.required, validation.email]
                        : [validation.required]
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p>
          These field(s) will be added to your Interbit identity and can be used
          in other apps that require them.
        </p>
        <div className="btn-container">
          <IconButton
            text="Save"
            type="submit"
            className={`ibweb-button ${!valid && `disabled`}`}
            clickHandler={() => handleSubmit()}
          />
          <IconButton
            text="Cancel"
            className="secondary"
            clickHandler={() => {
              toggleForm(formNames.CAUTH_ADD_REQUESTED_TOKENS)
            }}
          />
        </div>
      </form>
    )

    return (
      <div>
        {image && <img src={image} alt={imageAlt} />}
        <h3>{title}</h3>

        {isEditable ? editForm : viewForm}
      </div>
    )
  }
}

export default reduxForm({
  form: formNames.CAUTH_ADD_REQUESTED_TOKENS
})(ConnectFormAddMissingProfileField)
