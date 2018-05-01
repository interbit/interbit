import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox, FormControl } from 'react-bootstrap'
import {
  ContentBar,
  Divider,
  IconButton,
  ModalWrapper
} from 'interbit-ui-components'

import modalNames from '../constants/modalNames'
import chairmanmeow from '../assets/chairmanmeow.jpg'

export default class ModalSignUp extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
  }

  render() {
    const { show, toggleModal } = this.props

    const header = (
      <div>
        <h2>Sign up to access (app name)</h2>
        <p>
          Sign in with a link sent to your email (no passwordz), or use an
          authentication provider (GitHub), sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.
        </p>
      </div>
    )

    const body = (
      <div>
        <ContentBar image={chairmanmeow} className="image-sm" title="Email">
          <FormControl
            type="text"
            placeholder="Enter your email address to sign in"
          />
          <Checkbox inline={false}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </Checkbox>
          <Divider />
          <IconButton text="Continue" />
        </ContentBar>
        <ContentBar
          image={chairmanmeow}
          className="image-sm"
          title="Sign in with GitHub">
          <Checkbox inline={false}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt.
          </Checkbox>
          <Divider />
          <IconButton text="Continue" />
        </ContentBar>
      </div>
    )

    const footer = (
      <div>
        <Button
          className="text-button"
          onClick={() => {
            toggleModal(modalNames.SIGN_UP_MODAL_NAME)
          }}>
          Cancel
        </Button>
        <Button className="text-button">Already have an account?</Button>
      </div>
    )

    return (
      <ModalWrapper
        header={header}
        body={body}
        footer={footer}
        className="modal-sign-in"
        show={show}
      />
    )
  }
}
