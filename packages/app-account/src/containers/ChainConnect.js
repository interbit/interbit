import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { chainDispatch, selectors } from 'interbit-ui-tools'

import { actionCreators } from '../interbit/my-account/actions'
import ConnectFormAddMissingProfileField from '../components/ConnectFormAddMissingProfileField'
import ConnectFormContinueAuth from '../components/ConnectFormContinueAuth'
import ConnectFormLoggedOut from '../components/ConnectFormLoggedOut'
import ConnectFormMissingProfileField from '../components/ConnectFormMissingProfileField'
import ModalSignIn from '../components/ModalSignIn'
import ModalSignUp from '../components/ModalSignUp'
import { toggleModal } from '../redux/uiReducer'
import modalNames from '../constants/modalNames'
import { PRIVATE } from '../constants/chainAliases'
import connectingHeader from '../assets/connectingHeader.svg'

const MODES = {
  NOT_LOGGED_IN: 0,
  PROPS_MISSING: 1,
  PROPS_ADDING: 2,
  PROPS_AVAILABLE: 3
}

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)

  const chainState = selectors.getChain(state, { chainAlias: PRIVATE })

  const { chainId, redirectUrl, tokens } = query
  const isSignInModalVisible = state.ui.modals[modalNames.SIGN_IN_MODAL_NAME]
  const isSignUpModalVisible = state.ui.modals[modalNames.SIGN_UP_MODAL_NAME]

  return {
    profileFields: chainState ? chainState.profile : {},
    redirectUrl,
    consumerChainId: chainId,
    requestedTokens: Array.isArray(tokens) ? tokens : [tokens],
    providerChainId: selectors.getChainId(state, { chainAlias: PRIVATE }),
    mode: MODES.PROPS_AVAILABLE,
    isSignInModalVisible,
    isSignUpModalVisible
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action)),
  toggleModalFunction: modalName => dispatch(toggleModal(modalName))
})

export class ChainConnect extends Component {
  static propTypes = {
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    redirectUrl: PropTypes.string,
    providerChainId: PropTypes.string,
    consumerChainId: PropTypes.string,
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    blockchainDispatch: PropTypes.func.isRequired,
    mode: PropTypes.number,
    isSignInModalVisible: PropTypes.bool,
    isSignUpModalVisible: PropTypes.bool,
    toggleModalFunction: PropTypes.func.isRequired
  }

  static defaultProps = {
    profileFields: {},
    redirectUrl: '',
    providerChainId: '',
    consumerChainId: '',
    requestedTokens: [],
    mode: MODES.NOT_LOGGED_IN,
    isSignInModalVisible: false,
    isSignUpModalVisible: false
  }

  doConnectChains = async () => {
    const {
      blockchainDispatch,
      providerChainId,
      consumerChainId,
      requestedTokens,
      redirectUrl
    } = this.props

    const shareProfileTokensAction = actionCreators.shareProfileTokens({
      consumerChainId,
      sharedTokens: requestedTokens
    })

    await blockchainDispatch(shareProfileTokensAction)

    const redirectOpts = {
      providerChainId,
      joinName: shareProfileTokensAction.payload.joinName
    }
    const nextUrl = `${redirectUrl}?${queryString.stringify(redirectOpts)}`
    window.location.replace(nextUrl)
  }

  render() {
    const {
      mode,
      consumerChainId,
      requestedTokens,
      profileFields,
      isSignInModalVisible,
      isSignUpModalVisible,
      toggleModalFunction,
      providerChainId
    } = this.props

    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    const getFormForCurrentMode = () => {
      switch (mode) {
        case MODES.NOT_LOGGED_IN:
          return (
            <ConnectFormLoggedOut
              toggleModalFunction={toggleModalFunction}
              requestedTokens={requestedTokens}
            />
          )
        case MODES.PROPS_MISSING:
          return (
            <ConnectFormMissingProfileField profileFields={profileFields} />
          )
        case MODES.PROPS_ADDING:
          return (
            <ConnectFormAddMissingProfileField profileFields={profileFields} />
          )
        case MODES.PROPS_AVAILABLE:
        default:
          return (
            <ConnectFormContinueAuth
              requestedTokens={requestedTokens}
              profileFields={profileFields}
              providerChainId={providerChainId}
              doConnectChains={this.doConnectChains}
            />
          )
      }
    }

    return (
      <Grid>
        <div className="ibweb-page app-auth">
          <Row>
            <Col {...colLayout}>
              <img src={connectingHeader} alt="App info access" />
              <h3>
                (Service: {consumerChainId}) wants to access the following
                identity information:
              </h3>
              {getFormForCurrentMode()}
            </Col>
          </Row>
        </div>

        {/* TODO: consolidate these two modals */}
        <ModalSignIn
          show={isSignInModalVisible}
          toggleModal={toggleModalFunction}
        />
        <ModalSignUp
          show={isSignUpModalVisible}
          toggleModal={toggleModalFunction}
        />
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainConnect)
