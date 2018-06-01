import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Form, FormControl, FormGroup, Button, Checkbox } from 'react-bootstrap'

// eslint-disable-next-line
const renderInput = ({onChange, props, label, placeholder, type, input, meta: {touched, error, warning}}) => (
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

class EditTodoRow extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    toggleRow: PropTypes.func
  }

  static defaultProps = {
    toggleRow: undefined,
    editFormProps: {}
  }

  render() {
    const { id, handleSubmit, toggleRow } = this.props

    return (
      <tr>
        <td className="col-id">{id}</td>
        <td className="col-form" colSpan={4}>
          <Form inline onSubmit={handleSubmit}>
            <Field type="hidden" component={renderInput} name="id" />
            <FormGroup className="form-title">
              <Field
                type="text"
                component={renderInput}
                name="title"
                placeholder="Title *"
              />
            </FormGroup>

            <FormGroup className="form-description">
              <Field
                type="text"
                component={renderInput}
                name="description"
                placeholder="Description"
              />
            </FormGroup>

            <FormGroup className="form-completed">
              <Field type="checkbox" component={renderInput} name="completed" />
            </FormGroup>

            <FormGroup className="form-buttons">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="ibweb-button">
                Save
              </Button>
              <Button
                className="ibweb-button secondary"
                onClick={() => toggleRow(id)}>
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </td>
      </tr>
    )
  }
}

export default reduxForm({
  form: `edit-todo-form`
})(EditTodoRow)
