import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import { chainDispatch, selectors } from 'interbit-ui-tools'

import { actionCreators } from '../interbit/my-account/actions'
import { getOAuthConfig } from '../interbit/public/selectors'
import ConnectFormAddMissingProfileField from '../components/ConnectFormAddMissingProfileField'
import ConnectFormContinueAuth from '../components/ConnectFormContinueAuth'
import ConnectFormLoggedOut from '../components/ConnectFormLoggedOut'
import ModalSignIn from '../components/ModalSignIn'
import ModalSignUp from '../components/ModalSignUp'
import { toggleForm, toggleModal } from '../redux/uiReducer'
import formNames from '../constants/formNames'
import modalNames from '../constants/modalNames'
import { PRIVATE, PUBLIC } from '../constants/chainAliases'

const MODES = {
  NOT_LOGGED_IN: 0,
  ADD_PROFILE_FIELDS: 1,
  CONTINUE_CAUTH: 2
}

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { chainAlias, chainId, redirectUrl, tokens } = query

  const isChainLoaded = selectors.isChainLoaded(state, { chainAlias: PRIVATE })
  const chainState = selectors.getChain(state, { chainAlias: PRIVATE })
  const requestedTokens = Array.isArray(tokens) ? tokens : [tokens]
  const profileFields = chainState ? chainState.profile : {}

  const isSignInModalVisible = state.ui.modals[modalNames.SIGN_IN_MODAL_NAME]
  const isSignUpModalVisible = state.ui.modals[modalNames.SIGN_UP_MODAL_NAME]
  const isProfileFormEditable =
    state.ui.editableForms[formNames.CAUTH_ADD_REQUESTED_TOKENS]
  const isLoggedIn = isChainLoaded && !!profileFields['gitHub-identity']

  let mode
  let missingFields = []

  const profileFormProps = {
    isEditable: isProfileFormEditable
  }

  if (!isLoggedIn) {
    mode = MODES.NOT_LOGGED_IN
  } else if (profileFields) {
    missingFields = requestedTokens.filter(t => !profileFields[t])
    profileFormProps.initialValues = profileFields
    mode = missingFields.length
      ? MODES.ADD_PROFILE_FIELDS
      : MODES.CONTINUE_CAUTH
  }

  const publicChainState = selectors.getChain(state, { chainAlias: PUBLIC })
  return {
    consumerChainAlias: chainAlias,
    consumerChainId: chainId,
    content: state.content.chainConnect,
    isSignInModalVisible,
    isSignUpModalVisible,
    mode,
    missingFields,
    oAuthConfig: getOAuthConfig(publicChainState),
    profileFields: chainState ? chainState.profile : {},
    profileFormProps,
    providerChainId: selectors.getChainId(state, { chainAlias: PRIVATE }),
    redirectUrl,
    requestedTokens
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action)),
  toggleFormFunction: formName => dispatch(toggleForm(formName)),
  toggleModalFunction: modalName => dispatch(toggleModal(modalName))
})

export class ChainConnect extends Component {
  static propTypes = {
    blockchainDispatch: PropTypes.func.isRequired,
    consumerChainAlias: PropTypes.string,
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
    profileFields: PropTypes.shape({}),
    profileFormProps: PropTypes.shape({}),
    providerChainId: PropTypes.string,
    redirectUrl: PropTypes.string,
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    toggleFormFunction: PropTypes.func.isRequired,
    toggleModalFunction: PropTypes.func.isRequired
  }

  static defaultProps = {
    consumerChainAlias: '',
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
    profileFormProps: {},
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

  cancelConnectChains = () => {
    const { redirectUrl } = this.props
    const nextUrl = `${redirectUrl}/?error=cancel`
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
      consumerChainAlias,
      consumerChainId,
      content,
      isSignInModalVisible,
      isSignUpModalVisible,
      missingFields,
      mode,
      oAuthConfig,
      profileFields,
      profileFormProps,
      providerChainId,
      requestedTokens,
      toggleFormFunction,
      toggleModalFunction
    } = this.props

    const colLayout = {
      lg: 8,
      lgOffset: 2,
      md: 12
    }

    const getFormForCurrentMode = () => {
      const componentTitle = `Service ${consumerChainAlias} ${content.title}`

      switch (mode) {
        case MODES.NOT_LOGGED_IN:
          return (
            <ConnectFormLoggedOut
              image={content.headerImage}
              imageAlt={content.headerImageAlt}
              onCancel={this.cancelConnectChains}
              requestedTokens={requestedTokens}
              title={componentTitle}
              toggleModalFunction={toggleModalFunction}
            />
          )
        case MODES.ADD_PROFILE_FIELDS:
          return (
            <ConnectFormAddMissingProfileField
              image={content.headerImage}
              imageAlt={content.headerImageAlt}
              missingFields={missingFields}
              onCancel={this.cancelConnectChains}
              profileFields={profileFields}
              {...profileFormProps}
              onSubmit={this.submitMissingProfileFieldForm}
              title={componentTitle}
              toggleForm={toggleFormFunction}
            />
          )
        case MODES.CONTINUE_CAUTH:
        default:
          return (
            <ConnectFormContinueAuth
              requestedTokens={requestedTokens}
              profileFields={profileFields}
              providerChainId={providerChainId}
              doConnectChains={this.doConnectChains}
              image={content.headerImage}
              imageAlt={content.headerImageAlt}
              onCancel={this.cancelConnectChains}
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
          serviceName={consumerChainAlias}
          show={isSignInModalVisible}
          toggleModal={toggleModalFunction}
        />
        <ModalSignUp
          blockchainDispatch={blockchainDispatch}
          consumerChainId={consumerChainId}
          oAuthConfig={oAuthConfig}
          serviceName={consumerChainAlias}
          show={isSignUpModalVisible}
          toggleModal={toggleModalFunction}
        />
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainConnect)
