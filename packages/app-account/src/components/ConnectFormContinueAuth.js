import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

export default class ConnectFormContinueAuth extends Component {
  static propTypes = {
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    providerChainId: PropTypes.string,
    doConnectChains: PropTypes.func
  }

  static defaultProps = {
    profileFields: [],
    requestedTokens: [],
    providerChainId: '',
    doConnectChains: undefined
  }

  render() {
    const {
      profileFields,
      requestedTokens,
      providerChainId,
      doConnectChains
    } = this.props
    return (
      <div>
        <Table>
          <tbody>
            {requestedTokens.map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{profileFields[key]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <IconButton
          className={providerChainId ? '' : 'disabled'}
          onClick={doConnectChains}
          text="Accept"
        />
        <IconButton text="Reject" className="secondary" />
      </div>
    )
  }
}
