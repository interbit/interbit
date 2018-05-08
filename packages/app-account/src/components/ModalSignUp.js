import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Checkbox } from 'react-bootstrap'
import {
  ContentBar,
  Divider,
  IconButton,
  ModalWrapper
} from 'interbit-ui-components'

import modalNames from '../constants/modalNames'
import iconGitHub from '../assets/icons/iconGitHub.svg'

export default class ModalSignUp extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    serviceName: PropTypes.string
  }

  static defaultProps = {
    serviceName: ''
  }

  render() {
    const { show, toggleModal, serviceName } = this.props

    const header = (
      <div>
        <h2>
          Sign up to access <span>{serviceName}</span>
        </h2>
      </div>
    )

    const body = (
      <div>
        <ContentBar
          image={iconGitHub}
          className="image-sm"
          title="Sign up with GitHub">
          <Checkbox inline={false}>
            Allow Interbit to access your GitHub username and user ID.
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
