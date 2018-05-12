import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

export default class ConnectFormContinueAuth extends Component {
  static propTypes = {
    doConnectChains: PropTypes.func,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    onCancel: PropTypes.func,
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    providerChainId: PropTypes.string,
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string
  }

  static defaultProps = {
    doConnectChains: undefined,
    image: '',
    imageAlt: '',
    onCancel: undefined,
    profileFields: [],
    providerChainId: '',
    requestedTokens: [],
    title: ''
  }

  render() {
    const {
      doConnectChains,
      image,
      imageAlt,
      onCancel,
      profileFields,
      providerChainId,
      requestedTokens,
      title
    } = this.props
    return (
      <div>
        {image && <img src={image} alt={imageAlt} />}
        <h3>{title}</h3>
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
          clickHandler={doConnectChains}
          text="Accept"
        />
        <IconButton
          text="Reject"
          className="secondary"
          clickHandler={() => onCancel()}
        />
      </div>
    )
  }
}
