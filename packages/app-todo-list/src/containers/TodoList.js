import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectors } from 'interbit-ui-tools'
import { Checkbox, Table } from 'react-bootstrap'

import chainAliases from '../constants/chainAliases'

const mapStateToProps = (state, ownProps) => {
  const chainState = selectors.getPrivateChain(state, {
    privateChainAlias: chainAliases.PRIVATE
  })

  const todos = chainState.getIn(['todos'])
  console.log('private chain state: ', chainState)
  console.log('todos: ', todos)
  return { todos }
}

export class TodoList extends Component {
  static propTypes = {
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
                <Checkbox checked={item.completed} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }
}

export default connect(mapStateToProps)(TodoList)
