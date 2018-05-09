import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button, Checkbox } from 'react-bootstrap'
import {
  ContentBar,
  Divider,
  IconButton,
  ModalWrapper
} from 'interbit-ui-components'

import Authentication from '../components/Authentication'
import modalNames from '../constants/modalNames'
import iconGitHub from '../assets/icons/iconGitHub.svg'

const mapStateToProps = state => ({
  contentBars: state.content.contentBars
})

export class ModalSignUp extends Component {
  static propTypes = {
    blockchainDispatch: PropTypes.func,
    consumerChainId: PropTypes.string,
    contentBars: PropTypes.shape({}),
    // eslint-disable-next-line
    oAuthConfig: PropTypes.object,
    serviceName: PropTypes.string,
    show: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
  }

  static defaultProps = {
    blockchainDispatch: () => {},
    consumerChainId: '',
    contentBars: {},
    oAuthConfig: {},
    serviceName: ''
  }

  render() {
    const {
      blockchainDispatch,
      consumerChainId,
      contentBars,
      oAuthConfig,
      serviceName,
      show,
      toggleModal
    } = this.props

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
        <Authentication
          blockchainDispatch={blockchainDispatch}
          consumerChainId={consumerChainId}
          oAuthConfig={oAuthConfig}
          {...contentBars.gitHubCreateAccount}
        />
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
        <Button
          className="text-button"
          onClick={() => {
            toggleModal(modalNames.SIGN_UP_MODAL_NAME)
            toggleModal(modalNames.SIGN_IN_MODAL_NAME)
          }}>
          Already have an account?
        </Button>
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

export default connect(mapStateToProps)(ModalSignUp)
