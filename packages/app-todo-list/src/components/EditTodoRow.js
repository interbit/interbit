import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { FormControl } from 'react-bootstrap'

// eslint-disable-next-line
const renderInput = ({onChange, props, placeholder, type, input, meta: {touched, error, warning}}) => (
  <div className={touched && error ? 'field-error' : ''}>
    <FormControl placeholder={placeholder} type={type} {...input} />
    {touched &&
      ((error && <span className="error-msg">{error}</span>) ||
        (warning && <span>{warning}</span>))}
  </div>
)

class EditTodoRow extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired
  }

  render() {
    const { id } = this.props

    return (
      <tr>
        <td>{id}</td>
        <td colSpan={4}>
          <form>
            <Field
              type="text"
              component={renderInput}
              name="title"
              placeholder="Title *"
            />

            <Field
              type="text"
              component={renderInput}
              name="description"
              placeholder="Description"
            />
          </form>
        </td>
      </tr>
    )
  }
}

export default reduxForm({
  form: 'edit-todo-form'
})(EditTodoRow)
