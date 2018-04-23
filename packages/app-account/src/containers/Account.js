import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { SubmissionError } from 'redux-form'
import { chainDispatch, selectors } from 'interbit-middleware'
import { Markdown } from 'lib-react-interbit'

import ContentBarApp from '../components/ContentBarApp'
import ContentBarAttention from '../components/ContentBarAttention'
import ProfileForm from '../components/ProfileForm'
import ModalAppAccess from '../components/ModalAppAccess'
import ModalAttentionMoreInfo from '../components/ModalAttentionMoreInfo'

import chairmanmeow from '../assets/chairmanmeow.jpg'

import { actionCreators } from '../interbit/my-account/actions'
import { actionCreators as publicActionCreators } from '../interbit/public/actions'
import { getOAuthProviderChainId } from '../interbit/public/selectors'
import { getExploreChainState } from '../redux/exploreChainReducer'
import { toggleForm, toggleModal } from '../redux/uiReducer'
import formNames from '../constants/formNames'
import modalNames from '../constants/modalNames'
import { PUBLIC, PRIVATE } from '../constants/chainAliases'

const mapStateToProps = (state, ownProps) => {
  const isAccountFormEditable =
    state.ui.editableForms[formNames.ACCOUNT_FORM_NAME]
  const isAttentionMoreInfoModalVisible =
    state.ui.modals[modalNames.ATTENTION_MORE_INFO_MODAL_NAME]

  const { state: chainState } = getExploreChainState(state)
  const profileFormProps = {
    isEditable: isAccountFormEditable
  }

  if (chainState && chainState.profile) {
    const profile = chainState.profile
    const hasProfileInfo = Object.values(profile).some(
      x => x !== null && x !== ''
    )
    hasProfileInfo && (profileFormProps.initialValues = profile)
  }

  const notAuthenticating = {
    profile: chainState ? chainState.profile : {},
    isAccountFormEditable,
    profileFormProps,
    content: state.content.account,
    contentBars: state.content.contentBars,
    modals: state.content.modals,
    isAttentionMoreInfoModalVisible
  }

  const {
    location: { search },
    match: { params }
  } = ownProps
  const query = queryString.parse(search)
  const { code, state: requestId } = query
  const { oAuthProvider } = params

  if (!(oAuthProvider && code && requestId)) {
    return notAuthenticating
  }

  const consumerChainId = selectors.getChainId(state.interbit, PRIVATE)
  if (!consumerChainId) {
    return notAuthenticating
  }

  const pendingRequestId = chainState.getIn([
    'authenticationRequests',
    requestId
  ])

  if (!pendingRequestId) {
    return notAuthenticating
  }

  const providerChainId =
    oAuthProvider &&
    state.interbit &&
    state.interbit.chains &&
    state.interbit.chains.public
      ? getOAuthProviderChainId(state.interbit.chains.public, oAuthProvider)
      : undefined

  if (!providerChainId) {
    return notAuthenticating
  }

  return {
    ...notAuthenticating,
    consumerChainId,
    providerChainId,
    oAuthProvider,
    code,
    requestId,
    isAuthenticating: true
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action)),
  publicChainDispatch: action => dispatch(chainDispatch(PUBLIC, action)),
  toggleFormFunction: formName => dispatch(toggleForm(formName)),
  toggleModalFunction: modalName => dispatch(toggleModal(modalName))
})

export class Account extends Component {
  static propTypes = {
    profile: PropTypes.shape({
      alias: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string
    }),
    blockchainDispatch: PropTypes.func.isRequired,
    publicChainDispatch: PropTypes.func.isRequired,
    toggleFormFunction: PropTypes.func.isRequired,
    profileFormProps: PropTypes.shape({}),
    isAuthenticating: PropTypes.bool,
    consumerChainId: PropTypes.string,
    providerChainId: PropTypes.string,
    oAuthProvider: PropTypes.string,
    code: PropTypes.string,
    requestId: PropTypes.string,
    content: PropTypes.shape({}).isRequired,
    contentBars: PropTypes.shape({}).isRequired,
    modals: PropTypes.shape({}).isRequired,
    toggleModalFunction: PropTypes.func.isRequired,
    isAttentionMoreInfoModalVisible: PropTypes.bool
  }

  static defaultProps = {
    profile: {
      alias: '',
      name: '',
      email: ''
    },
    profileFormProps: {},
    isAuthenticating: false,
    oAuthProvider: undefined,
    code: undefined,
    requestId: undefined,
    providerChainId: undefined,
    consumerChainId: undefined,
    isAttentionMoreInfoModalVisible: false
  }

  componentDidUpdate() {
    const {
      isAuthenticating,
      oAuthProvider,
      code,
      requestId,
      consumerChainId,
      blockchainDispatch,
      providerChainId,
      publicChainDispatch
    } = this.props

    if (isAuthenticating) {
      const joinName = `${oAuthProvider}-${consumerChainId}`
      const tokenName = `${oAuthProvider}-identity`

      const privateChainAction = actionCreators.completeAuthentication({
        oAuthProvider,
        providerChainId,
        tokenName,
        joinName,
        requestId
      })
      blockchainDispatch(privateChainAction)

      const publicAccountAction = publicActionCreators.oAuthSignIn({
        oAuthProvider,
        consumerChainId,
        requestId,
        joinName,
        temporaryToken: code
      })
      publicChainDispatch(publicAccountAction)
    }
  }

  submit = formValues => {
    try {
      const action = actionCreators.updateProfile(formValues)

      this.props.blockchainDispatch(action)
      this.props.toggleFormFunction(formNames.ACCOUNT_FORM_NAME)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  render() {
    const {
      profile,
      toggleFormFunction,
      profileFormProps,
      content,
      contentBars,
      modals,
      toggleModalFunction,
      isAttentionMoreInfoModalVisible
    } = this.props

    const colLayout = {
      lg: 8,
      lgOffset: 2,
      md: 12,
      mdOffset: 0
    }

    return (
      <Grid>
        <div className="ibweb-page">
          <Row className="ibweb-mg-md">
            <Col {...colLayout}>
              <h1>{content.title}</h1>
              <Markdown markdown={content.intro} className="ibweb-intro" />
            </Col>
          </Row>

          <Row>
            <Col {...colLayout}>
              <ContentBarAttention
                {...contentBars.attention}
                toggleModal={toggleModalFunction}
              />
            </Col>
          </Row>

          <Row>
            <Col {...colLayout}>
              <ProfileForm
                onSubmit={this.submit}
                toggleForm={toggleFormFunction}
                profile={profile}
                {...profileFormProps}
              />
            </Col>
          </Row>

          {/* TODO: to be added when delete account info functionality exists
          <Row>
            <Col {...colLayout}>
              <DeleteData {...content.deleteData} />
            </Col>
          </Row>
          */}

          <Row className="ibweb-mg-md">
            <Col {...colLayout}>
              <h1>{content.apps.title}</h1>
              <Markdown
                markdown={content.apps.content}
                className="ibweb-intro"
              />
            </Col>
          </Row>

          <Row className="ibweb-mg-xx-lg">
            <Col {...colLayout}>
              <ContentBarApp {...contentBars.appStore} />
              <ContentBarApp {...contentBars.appHosting} />
            </Col>
          </Row>
        </div>

        <ModalAppAccess image={chairmanmeow} appName="App Name" />
        <ModalAttentionMoreInfo
          {...modals.attentionMoreInfo}
          toggleModal={toggleModalFunction}
          show={isAttentionMoreInfoModalVisible}
        />
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
