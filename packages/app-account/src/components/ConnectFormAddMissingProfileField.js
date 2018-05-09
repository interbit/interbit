import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Button, FormGroup, FormControl, Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

import formNames from '../constants/formNames'

// eslint-disable-next-line
const renderInput = ({onChange, props, placeholder, type, input, meta: {touched, error, warning}}) => (
  <div className={touched && error ? 'field-error' : ''}>
    <FormControl placeholder={placeholder} type={type} {...input} />
    {touched &&
      ((error && <span className="error-msg">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)

export class ConnectFormAddMissingProfileField extends Component {
  static propTypes = {
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    missingFields: PropTypes.arrayOf(PropTypes.string),
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string
  }

  static defaultProps = {
    image: '',
    imageAlt: '',
    missingFields: [],
    profileFields: [],
    title: ''
  }

  render() {
    const {
      image,
      imageAlt,
      missingFields,
      profileFields,
      handleSubmit,
      title
    } = this.props

    return (
      <div>
        {image && <img src={image} alt={imageAlt} />}
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          <Table>
            <tbody>
              {/* TODO: only show the fields that have values ,
              or let user edit all their profile fields
              also create hidden input fields populated with existing values */}
              {Object.keys(profileFields).map(key => (
                <tr key={`${key}-value`}>
                  <td>{key}</td>
                  <td>{profileFields[key]}</td>
                </tr>
              ))}
              {!!missingFields.length &&
                missingFields.map(field => (
                  <tr key={field}>
                    <td colSpan={2} className="form-td">
                      <FormGroup>
                        <Field
                          component={renderInput}
                          name={field}
                          placeholder={`Add ${field}`}
                          type="text"
                        />
                      </FormGroup>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <p>
            These field(s) will be added to your Interbit identity and can be
            used in other apps that require them.
          </p>
          <Button type="submit" className="ibweb-button" onClick={handleSubmit}>
            Save
          </Button>
          <IconButton text="Cancel" className="secondary" />
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: formNames.CAUTH_ADD_REQUESTED_TOKENS
})(ConnectFormAddMissingProfileField)
