import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, FormGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { renderInput, IconButton } from 'interbit-ui-components'
import PropTypes from 'prop-types'
import renderFontAwesomePicker from './renderFontAwesomePicker'

import ProjectHostingForm from '../components/ProjectHostingForm'

class ProjectDetailsForm extends Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    form: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props

    const detailsView = (
      <div style={{ display: 'none' }}>
        <h2>Project Name</h2>
        <div className="ibweb-mg-sm">
          <h4>Notes</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eius tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud.
          </p>
        </div>

        <div className="ibweb-mg-sm">
          <h4>Github Repository</h4>
          <p>https://github.com/DerekZ/my-vacation-planner.git</p>
        </div>

        <div className="ibweb-mg-sm">
          <h4>Branch</h4>
          <p>master</p>
        </div>

        <div className="ibweb-mg-sm">
          <h4>Automatic Deployment</h4>
          <p>
            If enabled, every push to this branch will
            <strong> automatically deploy</strong> a new version of the app.
          </p>
          <IconButton
            className="destructive"
            text="Disable Automatic Deploys"
            to="#"
          />
        </div>
      </div>
    )

    return (
      <div>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Field
              name="name"
              component={renderInput}
              type="text"
              label="Project Name"
              placeholder="Project Name"
              labelSm={3}
              inputSm={9}
            />
          </FormGroup>

          <FormGroup>
            <Field
              name="description"
              component={renderInput}
              type="textarea"
              label="Notes"
              placeholder="Notes"
              labelSm={3}
              inputSm={9}
            />
          </FormGroup>

          <FormGroup>
            <Field
              name="github"
              component={renderInput}
              type="text"
              label="GitHub Repository"
              placeholder="GitHub Repository"
              labelSm={3}
              inputSm={9}
            />
          </FormGroup>

          <FormGroup>
            <Field
              name="branch"
              component={renderInput}
              type="select"
              label="Branch"
              placeholder="Select Branch"
              labelSm={3}
              inputSm={9}
            />
          </FormGroup>

          <FormGroup>
            <Field
              name="branch"
              component={renderInput}
              type="checkbox"
              label="Automatic Deployment"
              placeholder="Select Branch"
              checkboxTitle="Enable automatic deploys from GitHub. Every push to this branch will automatically deploy a new version of the app."
              labelSm={3}
              inputSm={9}
            />
          </FormGroup>
          <FormGroup>
            <Field
              name="faIcon"
              component={renderFontAwesomePicker}
              type="select"
              label="App Icon"
              className="Select-icon"
            />
          </FormGroup>
          <IconButton text="Create Project" onClick={handleSubmit} />
          <LinkContainer to="/projects">
            <IconButton text="Cancel" className="secondary" />
          </LinkContainer>
        </Form>

        {detailsView}
        <ProjectHostingForm />
      </div>
    )
  }
}

export default reduxForm({})(ProjectDetailsForm)
