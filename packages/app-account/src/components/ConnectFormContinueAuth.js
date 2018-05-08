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
    doConnectChains: PropTypes.func,
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    profileFields: [],
    requestedTokens: [],
    providerChainId: '',
    doConnectChains: undefined,
    image: '',
    imageAlt: '',
    title: ''
  }

  render() {
    const {
      profileFields,
      requestedTokens,
      providerChainId,
      doConnectChains,
      image,
      imageAlt,
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
          onClick={doConnectChains}
          text="Accept"
        />
        <IconButton text="Reject" className="secondary" />
      </div>
    )
  }
}
