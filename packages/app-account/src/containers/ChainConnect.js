import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { chainDispatch, selectors } from 'interbit-ui-tools'

import { actionCreators } from '../interbit/my-account/actions'
import { getOAuthConfig } from '../interbit/public/selectors'
import Connecting from '../components/Connecting'
import ConnectFormAddMissingProfileField from '../components/ConnectFormAddMissingProfileField'
import ConnectFormContinueAuth from '../components/ConnectFormContinueAuth'
import ConnectFormLoggedOut from '../components/ConnectFormLoggedOut'
import ConnectFormMissingProfileField from '../components/ConnectFormMissingProfileField'
import ModalSignIn from '../components/ModalSignIn'
import ModalSignUp from '../components/ModalSignUp'
import { toggleModal } from '../redux/uiReducer'
import modalNames from '../constants/modalNames'
import { PRIVATE, PUBLIC } from '../constants/chainAliases'

const MODES = {
  NOT_LOGGED_IN: 0,
  PROPS_MISSING: 1,
  PROPS_ADDING: 2,
  PROPS_AVAILABLE: 3,
  LOADING_CHAIN: 4
}

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { chainId, redirectUrl, tokens } = query

  const isChainLoaded = selectors.isChainLoaded(state, { chainAlias: PRIVATE })
  const chainState = selectors.getChain(state, { chainAlias: PRIVATE })
  const requestedTokens = Array.isArray(tokens) ? tokens : [tokens]
  const profileFields = chainState ? chainState.profile : {}

  const isSignInModalVisible = state.ui.modals[modalNames.SIGN_IN_MODAL_NAME]
  const isSignUpModalVisible = state.ui.modals[modalNames.SIGN_UP_MODAL_NAME]

  // TODO: isLoggedIn === true if gitHub oauth has completed and private chain is loaded
  const isLoggedIn = true
  let mode
  let missingFields = []

  if (!isChainLoaded) {
    mode = MODES.LOADING_CHAIN
  } else if (!isLoggedIn) {
    mode = MODES.NOT_LOGGED_IN
  } else if (profileFields) {
    missingFields = requestedTokens.filter(t => !profileFields[t])
    mode = missingFields.length ? MODES.PROPS_MISSING : MODES.PROPS_AVAILABLE
  }

  const publicChainState = selectors.getChain(state, { chainAlias: PUBLIC })
  return {
    consumerChainId: chainId,
    content: state.content.chainConnect,
    isSignInModalVisible,
    isSignUpModalVisible,
    mode,
    missingFields,
    oAuthConfig: getOAuthConfig(publicChainState),
    profileFields: chainState ? chainState.profile : {},
    providerChainId: selectors.getChainId(state, { chainAlias: PRIVATE }),
    redirectUrl,
    requestedTokens
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action)),
  toggleModalFunction: modalName => dispatch(toggleModal(modalName))
})

export class ChainConnect extends Component {
  static propTypes = {
    blockchainDispatch: PropTypes.func.isRequired,
    consumerChainId: PropTypes.string,
    content: PropTypes.shape({
      headerImage: PropTypes.string,
      headerImageAlt: PropTypes.string,
      title: PropTypes.string
    }),
    isSignInModalVisible: PropTypes.bool,
    isSignUpModalVisible: PropTypes.bool,
    missingFields: PropTypes.arrayOf(PropTypes.string),
    mode: PropTypes.number,
    // eslint-disable-next-line
    oAuthConfig: PropTypes.object,
    profileFields: PropTypes.shape({
      alias: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string
    }),
    providerChainId: PropTypes.string,
    redirectUrl: PropTypes.string,
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    toggleModalFunction: PropTypes.func.isRequired
  }

  static defaultProps = {
    consumerChainId: '',
    content: {
      headerImage: '',
      headerImageAlt: '',
      title: ''
    },
    isSignInModalVisible: false,
    isSignUpModalVisible: false,
    missingFields: [],
    mode: MODES.LOADING_CHAIN,
    oAuthConfig: {},
    profileFields: {},
    providerChainId: '',
    redirectUrl: '',
    requestedTokens: []
  }

  doConnectChains = async () => {
    const {
      blockchainDispatch,
      consumerChainId,
      providerChainId,
      redirectUrl,
      requestedTokens
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

  submitMissingProfileFieldForm = formValues => {
    try {
      const action = actionCreators.updateProfile(formValues)
      this.props.blockchainDispatch(action)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  render() {
    const {
      blockchainDispatch,
      consumerChainId,
      content,
      isSignInModalVisible,
      isSignUpModalVisible,
      missingFields,
      mode,
      oAuthConfig,
      profileFields,
      providerChainId,
      requestedTokens,
      toggleModalFunction
    } = this.props

    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    const getFormForCurrentMode = () => {
      const componentTitle = `Service ${consumerChainId} ${content.title}`

      switch (mode) {
        case MODES.LOADING_CHAIN:
          return <Connecting />
        case MODES.NOT_LOGGED_IN:
          return (
            <ConnectFormLoggedOut
              toggleModalFunction={toggleModalFunction}
              requestedTokens={requestedTokens}
              image={content.headerImage}
              imageAlt={content.headerImageAlt}
              title={componentTitle}
            />
          )
        case MODES.PROPS_MISSING:
          return (
            <ConnectFormMissingProfileField
              image={content.headerImage}
              imageAlt={content.headerImageAlt}
              missingFields={missingFields}
              profileFields={profileFields}
              title={componentTitle}
            />
          )
        case MODES.PROPS_ADDING:
          return (
            <ConnectFormAddMissingProfileField
              image={content.headerImage}
              imageAlt={content.headerImageAlt}
              missingFields={missingFields}
              profileFields={profileFields}
              onSubmit={this.submitMissingProfileFieldForm}
              title={componentTitle}
            />
          )
        case MODES.PROPS_AVAILABLE:
        default:
          return (
            <ConnectFormContinueAuth
              requestedTokens={requestedTokens}
              profileFields={profileFields}
              providerChainId={providerChainId}
              doConnectChains={this.doConnectChains}
              image={content.headerImage}
              imageAlt={content.headerImageAlt}
              title={componentTitle}
            />
          )
      }
    }

    return (
      <Grid>
        <div className="ibweb-page app-auth">
          <Row>
            <Col {...colLayout}>{getFormForCurrentMode()}</Col>
          </Row>
        </div>

        {/* TODO: consolidate these two modals */}
        <ModalSignIn
          blockchainDispatch={blockchainDispatch}
          consumerChainId={consumerChainId}
          oAuthConfig={oAuthConfig}
          serviceName={consumerChainId}
          show={isSignInModalVisible}
          toggleModal={toggleModalFunction}
        />
        <ModalSignUp
          blockchainDispatch={blockchainDispatch}
          consumerChainId={consumerChainId}
          oAuthConfig={oAuthConfig}
          serviceName={consumerChainId}
          show={isSignUpModalVisible}
          toggleModal={toggleModalFunction}
        />
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainConnect)
