import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { ModalWrapper } from 'interbit-ui-components'

import Authentication from '../components/Authentication'
import modalNames from '../constants/modalNames'

const mapStateToProps = state => ({
  contentBars: state.content.contentBars
})
export class ModalSignIn extends Component {
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
          Sign in to access <span>{serviceName}</span>
        </h2>
      </div>
    )

    const body = (
      <Authentication
        blockchainDispatch={blockchainDispatch}
        consumerChainId={consumerChainId}
        oAuthConfig={oAuthConfig}
        {...contentBars.gitHubSignIn}
      />
    )

    const footer = (
      <div>
        <Button
          className="text-button"
          onClick={() => {
            toggleModal(modalNames.SIGN_IN_MODAL_NAME)
          }}>
          Cancel
        </Button>
        <Button
          className="text-button"
          onClick={() => {
            toggleModal(modalNames.SIGN_IN_MODAL_NAME)
            toggleModal(modalNames.SIGN_UP_MODAL_NAME)
          }}>
          Don&rsquo;t have an account?
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

export default connect(mapStateToProps)(ModalSignIn)
