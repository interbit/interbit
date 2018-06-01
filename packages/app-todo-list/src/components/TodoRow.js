import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'react-bootstrap'

export default class TodoRow extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool,
    toggleTodo: PropTypes.func,
    editTodoClickHandler: PropTypes.func,
    isEditing: PropTypes.bool
  }

  static defaultProps = {
    description: '',
    completed: false,
    toggleTodo: undefined,
    editTodoClickHandler: undefined,
    isEditing: false
  }

  render() {
    const {
      id,
      title,
      description,
      completed,
      toggleTodo,
      editTodoClickHandler,
      isEditing
    } = this.props

    return (
      <tr>
        <td className="col-id">{id}</td>
        <td className="col-title">{title}</td>
        <td className="col-description">{description}</td>
        <td className="col-completed">
          <Checkbox checked={completed} onChange={() => toggleTodo(id)} />
        </td>
        <td className="col-edit">
          {!isEditing && (
            <a
              href="#"
              onClick={() => editTodoClickHandler(id)}
              className="disabled">
              <i className="fa fa-pencil" />
            </a>
          )}
        </td>
      </tr>
    )
  }
}
