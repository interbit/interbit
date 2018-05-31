import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SubmissionError, reset } from 'redux-form'
import { Checkbox, Table } from 'react-bootstrap'
import { chainDispatch, selectors } from 'interbit-ui-tools'

import chainAliases from '../constants/chainAliases'
import { actionCreators } from '../interbit/private/actions'
import AddTodoForm from '../components/AddTodoForm'

const mapStateToProps = (state, ownProps) => {
  const chainState = selectors.getPrivateChain(state, {
    privateChainAlias: chainAliases.PRIVATE
  })
  const todos = chainState.getIn(['todos'])
  return { todos }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action =>
    dispatch(chainDispatch(chainAliases.PRIVATE, action)),
  resetForm: formName => dispatch(reset(formName))
})

export class TodoList extends Component {
  static propTypes = {
    blockchainDispatch: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool
      })
    )
  }

  static defaultProps = {
    todos: []
  }

  toggleTodo = id => {
    const action = actionCreators.toggleTodo(id)
    this.props.blockchainDispatch(action)
  }

  addTodoSubmitHandler = formValues => {
    try {
      const action = actionCreators.addTodo(
        formValues.title,
        formValues.description
      )
      this.props.blockchainDispatch(action)
      this.props.resetForm('add-todo-form')
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  render() {
    const { todos } = this.props

    return (
      <div>
        <AddTodoForm onSubmit={this.addTodoSubmitHandler} />

        <h3>To Do List </h3>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Checkbox
                    checked={item.completed}
                    onClick={() => this.toggleTodo(item.id)}
                  />
                </td>
                <td>
                  <i className="fa fa-pencil" />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
