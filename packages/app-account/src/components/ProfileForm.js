import React, { Component } from 'react'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { ContentBox, validation, renderInputNew } from 'interbit-ui-components'
import PropTypes from 'prop-types'

import formNames from '../constants/formNames'

class ProfileForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    isEditable: PropTypes.bool,
    profile: PropTypes.shape({
      alias: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      'gitHub-identity': PropTypes.shape({})
    })
  }

  static defaultProps = {
    isEditable: false,
    profile: {
      alias: '',
      name: '',
      email: '',
      'gitHub-identity': {}
    }
  }

  render() {
    const { handleSubmit, isEditable, toggleForm, profile } = this.props
    const hasProfileInfo = Object.values(profile).some(
      x => x !== null && x !== ''
    )

    const sectionIntro = (
      <ContentBox
        title="Profile"
        content="The profile data entered here will be available for you to selectively share with other applications. You have exclusive control of this information and can change access to it at any time."
        className="md"
      />
    )

    const viewForm = (
      <form>
        {profile['gitHub-identity'] && (
          <FormGroup key="gitHub">
            <ControlLabel>GitHub username</ControlLabel>
            <FormControl.Static>
              {profile['gitHub-identity'].login}
            </FormControl.Static>
          </FormGroup>
        )}

        {Object.keys(profile)
          .filter(key => typeof profile[key] !== 'object')
          .map(key => (
            <FormGroup key={key}>
              <ControlLabel>{key}</ControlLabel>
              <FormControl.Static>{profile[key]}</FormControl.Static>
            </FormGroup>
          ))}
      </form>
    )

    const editForm = (
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="formHorizontalEmail">
          <ControlLabel>Email</ControlLabel>
          <Field
            type="email"
            component={renderInputNew}
            name="email"
            placeholder="Email"
            validate={[validation.email]}
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalAlias">
          <ControlLabel>Username</ControlLabel>
          <Field
            type="text"
            component={renderInputNew}
            name="alias"
            placeholder="Username"
          />
        </FormGroup>

        <FormGroup controlId="formHorizontalName">
          <ControlLabel>Name</ControlLabel>
          <Field
            type="text"
            component={renderInputNew}
            name="name"
            placeholder="Name"
          />
        </FormGroup>

        <FormGroup>
          <Button type="submit" onClick={handleSubmit} className="ibweb-button">
            Save Changes
          </Button>

          <Button
            className="ibweb-button ternary"
            onClick={() => {
              toggleForm(formNames.ACCOUNT_FORM_NAME)
            }}>
            Cancel
          </Button>
        </FormGroup>
      </form>
    )

    if (isEditable) {
      return (
        <div id="ib-test-profile" className="account-profile-form">
          {sectionIntro}
          {editForm}
        </div>
      )
    }

    return (
      <div id="ib-test-profile" className="account-profile-form">
        {sectionIntro}
        <Button
          onClick={() => {
            toggleForm(formNames.ACCOUNT_FORM_NAME)
          }}
          className="account-edit-button">
          Edit
        </Button>
        {hasProfileInfo && viewForm}
      </div>
    )
  }
}

export default reduxForm({
  form: formNames.ACCOUNT_FORM_NAME
})(ProfileForm)
