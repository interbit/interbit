import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { chainDispatch } from 'interbit-middleware'
import { Grid, Row, Col } from 'react-bootstrap'
import { ContentBar, Divider, IconButton, Markdown } from 'lib-react-interbit'

import Authentication from '../components/Authentication'
import { getOAuthConfig } from '../interbit/public/selectors'
import { getExploreChainState } from '../redux/exploreChainReducer'
import { toggleButton, toggleModal } from '../redux/uiReducer'
import ContentBarAttention from '../components/ContentBarAttention'
import ModalAttention from '../components/ModalAttention'
import ModalAttentionMoreInfo from '../components/ModalAttentionMoreInfo'
import layout from '../constants/layout'
import buttonNames from '../constants/buttonNames'
import modalNames from '../constants/modalNames'
import { PUBLIC, PRIVATE } from '../constants/chainAliases'

const mapStateToProps = state => {
  const { state: chainState } = getExploreChainState(state)
  const isAttentionButtonEnabled =
    state.ui.buttons[buttonNames.DISCLAIMER_BUTTON_NAME]
  const isAttentionMoreInfoModalVisible =
    state.ui.modals[modalNames.ATTENTION_MORE_INFO_MODAL_NAME]
  const isAttentionModalVisible =
    state.ui.modals[modalNames.ATTENTION_MODAL_NAME]

  if (!chainState) {
    return {
      content: state.content.createAccount,
      contentBars: state.content.contentBars,
      modals: state.content.modals,
      isAttentionButtonEnabled,
      isAttentionModalVisible,
      isAttentionMoreInfoModalVisible,
      oAuthConfig: {},
      blockchainDispatch: () => {}
    }
  }

  const { state: publicChainState } = getExploreChainState(state, PUBLIC)
  return {
    content: state.content.createAccount,
    contentBars: state.content.contentBars,
    modals: state.content.modals,
    isAttentionButtonEnabled,
    isAttentionModalVisible,
    isAttentionMoreInfoModalVisible,
    oAuthConfig: getOAuthConfig(publicChainState)
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch(PRIVATE, action)),
  toggleButtonFunction: (buttonName, buttonState) =>
    dispatch(toggleButton(buttonName, buttonState)),
  toggleModalFunction: modalName => dispatch(toggleModal(modalName))
})

export class CreateAccount extends Component {
  static propTypes = {
    // eslint-disable-next-line
    oAuthConfig: PropTypes.object,
    blockchainDispatch: PropTypes.func,
    content: PropTypes.shape({}).isRequired,
    contentBars: PropTypes.shape({}).isRequired,
    modals: PropTypes.shape({}).isRequired,
    isAttentionButtonEnabled: PropTypes.bool,
    isAttentionModalVisible: PropTypes.bool,
    isAttentionMoreInfoModalVisible: PropTypes.bool,
    toggleButtonFunction: PropTypes.func.isRequired,
    toggleModalFunction: PropTypes.func.isRequired
  }

  static defaultProps = {
    oAuthConfig: {},
    blockchainDispatch: () => {},
    isAttentionButtonEnabled: false,
    isAttentionModalVisible: false,
    isAttentionMoreInfoModalVisible: false
  }

  render() {
    const {
      oAuthConfig,
      blockchainDispatch,
      content,
      contentBars,
      modals,
      isAttentionButtonEnabled,
      isAttentionModalVisible,
      isAttentionMoreInfoModalVisible,
      toggleButtonFunction,
      toggleModalFunction
    } = this.props
    const colLayout = layout.colLayout.default

    return (
      <Grid>
        <div className="ibweb-page create-account">
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

              <Authentication
                oAuthConfig={oAuthConfig}
                blockchainDispatch={blockchainDispatch}
                {...contentBars.gitHubCreateAccount}
              />
            </Col>
          </Row>

          <Row className="ibweb-mg-md">
            <Col {...colLayout}>
              <h1>{content.signIn.title}</h1>
              <Markdown
                markdown={content.signIn.content}
                className="ibweb-intro"
              />
            </Col>
          </Row>

          {/* TODO: consolidate this ContentBar with the Authentication component, probs */}
          <Row className="ibweb-mg-xx-lg">
            <Col {...colLayout}>
              <ContentBar
                image={contentBars.gitHubSignIn.image}
                className="image-sm github"
                title="GitHub">
                <p>{contentBars.gitHubSignIn.content}</p>
                {/* TODO: only show error message if github auth fails
                <p className="error">{contentBars.gitHubSignIn.error}</p>
                */}
                <Divider />
                <IconButton
                  text={contentBars.gitHubSignIn.buttonText}
                  onClick={() => {
                    toggleModalFunction(modalNames.ATTENTION_MODAL_NAME)
                    toggleButtonFunction(
                      buttonNames.DISCLAIMER_BUTTON_NAME,
                      false
                    )
                  }}
                />
              </ContentBar>
            </Col>
          </Row>
        </div>

        <ModalAttentionMoreInfo
          {...modals.attentionMoreInfo}
          toggleModal={toggleModalFunction}
          show={isAttentionMoreInfoModalVisible}
        />
        <ModalAttention
          {...modals.attention}
          toggleButton={toggleButtonFunction}
          toggleModal={toggleModalFunction}
          isEnabled={isAttentionButtonEnabled}
          show={isAttentionModalVisible}
        />
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
