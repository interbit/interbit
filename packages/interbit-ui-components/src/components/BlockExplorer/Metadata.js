import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Table } from 'react-bootstrap'

// eslint-disable-next-line react/prefer-stateless-function
export default class Metadata extends Component {
  static propTypes = {
    block: PropTypes.shape({
      content: PropTypes.shape({
        actions: PropTypes.arrayOf(PropTypes.object)
      })
    })
  }

  static defaultProps = {
    block: {}
  }

  render() {
    const { block } = this.props
    const metadata =
      block && block.content
        ? { blockHash: block.blockHash, ...block.content }
        : []
    const keys = Object.keys(metadata).filter(
      key => key !== 'actions' && key !== 'state'
    )
    const actions = block && block.content ? block.content.actions : []
    return (
      <Grid fluid className="fillHeight">
        <Row className="metadata">
          <Table striped bordered condensed>
            <thead>
              <tr>
                <th>Key</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {keys.map(key => {
                const value = JSON.stringify(metadata[key], null, 4)
                return (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      <pre>{value}</pre>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Row>
        <Row>
          <h5 className="explorerColumnHeading">Block Actions</h5>
        </Row>
        <Row className="actions">
          {actions.map(action => {
            const title = action.type
            const actionKeys = Object.keys(action).filter(key => key !== 'type')
            return (
              <div key={action.hash}>
                <h5 className="actionTitle">{title}</h5>
                <Table striped bordered condensed>
                  <tbody>
                    {actionKeys.map(key => {
                      const value = JSON.stringify(action[key], null, 4)
                      return (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>
                            <pre>{value}</pre>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            )
          })}
        </Row>
      </Grid>
    )
  }
}
