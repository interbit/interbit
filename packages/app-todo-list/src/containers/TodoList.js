import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { SubmissionError, reset } from 'redux-form'
import { Table } from 'react-bootstrap'
import { interbitRedux } from 'interbit-ui-tools'

import chainAliases from '../constants/chainAliases'
import formNames from '../constants/formNames'
import { actionCreators } from '../interbit/private/actions'
import { toggleTodoRow } from '../redux/uiReducer'
import AddTodoForm from '../components/AddTodoForm'
import EditTodoRow from '../components/EditTodoRow'
import TodoRow from '../components/TodoRow'

const { chainDispatch, selectors } = interbitRedux

const mapStateToProps = (state, ownProps) => {
  const chainState = selectors.getChain(state, {
    chainAlias: chainAliases.PRIVATE
  })
  const todos = chainState.getIn(['todos'])

  const editableTodos = state.ui.editableTodos
  const editableTodoId = Object.keys(editableTodos).find(
    key => editableTodos[key]
  )
  const isEditing = !(typeof editableTodoId === 'undefined')
  const editFormProps = {}
  editFormProps.initialValues = isEditing ? { ...todos[editableTodoId] } : {}

  return { editableTodos, editFormProps, todos, isEditing }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action =>
    dispatch(chainDispatch(chainAliases.PRIVATE, action)),
  resetForm: formName => dispatch(reset(formName)),
  toggleTodoRowFunction: id => dispatch(toggleTodoRow(id))
})

export class TodoList extends Component {
  static propTypes = {
    blockchainDispatch: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    toggleTodoRowFunction: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        description: PropTypes.string,
        completed: PropTypes.bool
      })
    ),
    editableTodos: PropTypes.shape({}),
    editFormProps: PropTypes.shape({}),
    isEditing: PropTypes.bool
  }

  static defaultProps = {
    todos: [],
    editableTodos: {},
    editFormProps: {},
    isEditing: false
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
      this.props.resetForm(formNames.ADD_TODO)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  editTodoSubmitHandler = formValues => {
    try {
      const action = actionCreators.editTodo(
        formValues.id,
        formValues.title,
        formValues.description,
        formValues.completed
      )
      this.props.blockchainDispatch(action)
      this.props.toggleTodoRowFunction(formValues.id)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  editTodoClickHandler = id => {
    this.props.toggleTodoRowFunction(id)
  }

  render() {
    const { todos, editableTodos, editFormProps, isEditing } = this.props

    return (
      <div>
        <AddTodoForm onSubmit={this.addTodoSubmitHandler} />

        <h3>To-do List </h3>
        <Table className="todo-table">
          <thead>
            <tr>
              <th className="col-id">ID</th>
              <th className="col-title">Title</th>
              <th className="col-description">Description</th>
              <th className="col-completed">Completed</th>
              <th className="col-edit">Edit</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(
              item =>
                editableTodos[item.id] ? (
                  <EditTodoRow
                    key={item.id}
                    id={item.id}
                    onSubmit={this.editTodoSubmitHandler}
                    toggleRow={this.editTodoClickHandler}
                    enableReinitialize
                    {...editFormProps}
                  />
                ) : (
                  <TodoRow
                    key={item.id}
                    toggleTodo={this.toggleTodo}
                    editTodoClickHandler={this.editTodoClickHandler}
                    isEditing={isEditing}
                    {...item}
                  />
                )
            )}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
