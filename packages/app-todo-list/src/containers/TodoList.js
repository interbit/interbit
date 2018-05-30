import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { chainDispatch, selectors } from 'interbit-ui-tools'
import { Checkbox, Table } from 'react-bootstrap'

import chainAliases from '../constants/chainAliases'
import { actionCreators } from '../interbit/private/actions'

const mapStateToProps = (state, ownProps) => {
  const chainState = selectors.getPrivateChain(state, {
    privateChainAlias: chainAliases.PRIVATE
  })
  const todos = chainState.getIn(['todos'])
  return { todos }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action =>
    dispatch(chainDispatch(chainAliases.PRIVATE, action))
})

export class TodoList extends Component {
  static propTypes = {
    blockchainDispatch: PropTypes.func.isRequired,
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

  render() {
    const { todos } = this.props

    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Completed</th>
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
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
