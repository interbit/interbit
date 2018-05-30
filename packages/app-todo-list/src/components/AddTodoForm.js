import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

// eslint-disable-next-line
const renderInput = ({onChange, props, placeholder, type, input, meta: {touched, error, warning}}) => (
  <div className={touched && error ? 'field-error' : ''}>
    <FormControl placeholder={placeholder} type={type} {...input} />
    {touched &&
      ((error && <span className="error-msg">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)

class AddTodoForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <h3>Add a new to do item</h3>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <Field
            type="text"
            component={renderInput}
            name="title"
            placeholder="Title"
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <Field
            type="text"
            component={renderInput}
            name="description"
            placeholder="Description"
          />
        </FormGroup>

        <FormGroup>
          <Button type="submit" onClick={handleSubmit} className="ibweb-button">
            Add
          </Button>
        </FormGroup>
      </form>
    )
  }
}

export default reduxForm({
  form: 'add-todo-form'
})(AddTodoForm)
