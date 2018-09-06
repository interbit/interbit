import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { renderInputNew } from 'interbit-ui-components'

import formNames from '../constants/formNames'

class EditTodoRow extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    toggleRow: PropTypes.func
  }

  static defaultProps = {
    toggleRow: undefined
  }

  render() {
    const { id, handleSubmit, toggleRow } = this.props

    return (
      <tr>
        <td className="col-id">{id}</td>
        <td className="col-form" colSpan={4}>
          <Form inline onSubmit={handleSubmit}>
            <Field type="hidden" component={renderInputNew} name="id" />
            <FormGroup className="form-title">
              <Field
                type="text"
                component={renderInputNew}
                name="title"
                placeholder="Title *"
              />
            </FormGroup>

            <FormGroup className="form-description">
              <Field
                type="text"
                component={renderInputNew}
                name="description"
                placeholder="Description"
              />
            </FormGroup>

            <FormGroup className="form-completed">
              <Field
                type="checkbox"
                component={renderInputNew}
                name="completed"
              />
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
  form: formNames.EDIT_TODO
})(EditTodoRow)
