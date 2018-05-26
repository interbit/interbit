import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { ModalWrapper } from 'interbit-ui-components'

import Authentication from '../components/Authentication'
import modalNames from '../constants/modalNames'
import oAuthProviders from '../constants/oAuthProviders'

const mapStateToProps = state => ({
  contentBars: state.content.contentBars
})

export class ModalSignUp extends Component {
  static propTypes = {
    contentBars: PropTypes.shape({}),
    oAuth: PropTypes.shape({}),
    serviceName: PropTypes.string,
    show: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
  }

  static defaultProps = {
    contentBars: {},
    oAuth: {},
    serviceName: ''
  }

  render() {
    const { contentBars, oAuth, serviceName, show, toggleModal } = this.props

    const header = (
      <div>
        <h2>
          Sign up to access <span>{serviceName}</span>
        </h2>
      </div>
    )

    const body = (
      <Authentication
        oAuth={{ ...oAuth, provider: oAuthProviders.GITHUB }}
        {...contentBars.gitHubCreateAccount}
      />
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
