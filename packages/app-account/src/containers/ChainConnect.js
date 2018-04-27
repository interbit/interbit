import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import {
  Grid,
  Row,
  Col,
  Button,
  Table,
  Form,
  FormControl
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { chainDispatch, selectors } from 'interbit-middleware'
import { IconButton } from 'lib-react-interbit'

import { actionCreators } from '../interbit/my-account/actions'
import ModalSignIn from '../components/ModalSignIn'
import ModalSignUp from '../components/ModalSignUp'
import { toggleModal } from '../redux/uiReducer'
import modalNames from '../constants/modalNames'
import { PRIVATE } from '../constants/chainAliases'
import mainGraphic from '../assets/homeHeader.jpg'

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
      providerChainId,
      requestedTokens,
      profileFields,
      isSignInModalVisible,
      isSignUpModalVisible,
      toggleModalFunction
    } = this.props

    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    const formLoggedOut = (
      <div style={{ marginBottom: '100px' }}>
        <Table className="logged-out">
          <tbody>
            {requestedTokens.map(token => (
              <tr key={token}>
                <td>{token}</td>
                <td>Not signed in</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <p>
          Your (unfilled field name) will be added to your interbit identity and
          can be used in other apps that require a (unfilled field name).
        </p>
        <div className="btn-container">
          <IconButton
            text="Create Account"
            onClick={() => {
              toggleModalFunction(modalNames.SIGN_UP_MODAL_NAME)
            }}
          />
          <IconButton text="Go Back" className="secondary" />
        </div>
        <div className="text-btn-container">
          <Button
            className="text-button"
            onClick={() => {
              toggleModalFunction(modalNames.SIGN_IN_MODAL_NAME)
            }}>
            Have an Account? Sign-in
          </Button>
        </div>
      </div>
    )

    const formMissingProfileField = (
      <div style={{ marginBottom: '100px' }}>
        <Table>
          <tbody>
            {Object.keys(profileFields).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{profileFields[key]}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2}>
                <Button className="text-button">
                  Add a (missing token name)
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
        <IconButton text="Continue" className="disabled" />
        <IconButton text="Go Back" className="secondary" />
      </div>
    )

    const formMissingProfileFieldForm = (
      <Form style={{ marginBottom: '100px' }}>
        <Table>
          <tbody>
            {Object.keys(profileFields).map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{profileFields[key]}</td>
              </tr>
            ))}
            <tr>
              <td colSpan={2} className="form-td">
                <FormControl
                  type="text"
                  placeholder="Add a (missing token name)"
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <p>
          Your (unfilled field name) will be added to your interbit identity and
          can be used in other apps that require a (unfilled field name).
        </p>
        <IconButton text="Save" />
        <IconButton text="Cancel" className="secondary" />
      </Form>
    )

    const formContinueAuth = (
      <div>
        <Table>
          <tbody>
            {requestedTokens.map(key => (
              <tr key={key}>
                <td>{key}</td>
                <td>{profileFields[key]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <IconButton
          className={providerChainId ? '' : 'disabled'}
          onClick={this.doConnectChains}
          text="Accept"
        />
        <IconButton text="Reject" className="secondary" />
      </div>
    )

    const getFormForCurrentMode = () => {
      switch (mode) {
        case MODES.NOT_LOGGED_IN:
          return formLoggedOut
        case MODES.PROPS_MISSING:
          return formMissingProfileField
        case MODES.PROPS_ADDING:
          return formMissingProfileFieldForm
        case MODES.PROPS_AVAILABLE:
        default:
          return formContinueAuth
      }
    }

    return (
      <Grid>
        <div className="ibweb-page app-auth">
          <Row>
            <Col {...colLayout}>
              <img src={mainGraphic} alt="App info access" />
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
