import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table } from 'react-bootstrap'
import { IconButton } from 'interbit-ui-components'

import modalNames from '../constants/modalNames'

export default class ConnectFormLoggedOut extends Component {
  static propTypes = {
    toggleModalFunction: PropTypes.func.isRequired,
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    requestedTokens: [],
    image: '',
    imageAlt: '',
    title: ''
  }

  render() {
    const {
      toggleModalFunction,
      requestedTokens,
      image,
      imageAlt,
      title
    } = this.props

    return (
      <div>
        {image && <img src={image} alt={imageAlt} />}
        <h3>{title}</h3>
        <Table className="logged-out">
          <tbody>
            {requestedTokens.map(token => (
              <tr key={token}>
                <td>{token}</td>
                <td>Not signed in</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="btn-container">
          <IconButton
            text="Create Account"
            onClick={() => {
              toggleModalFunction(modalNames.SIGN_UP_MODAL_NAME)
            }}
          />
          <IconButton text="Go Back" className="secondary" />
        </div>
        <div className="text-btn-container">
          <Button
            className="text-button"
            onClick={() => {
              toggleModalFunction(modalNames.SIGN_IN_MODAL_NAME)
            }}>
            Have an Account? Sign-in
          </Button>
        </div>
      </div>
    )
  }
}
