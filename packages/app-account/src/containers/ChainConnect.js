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
import chairmanmeow from '../assets/chairmanmeow.jpg'

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)

  const chainState = state.interbit.chains
    ? state.interbit.chains[PRIVATE]
    : undefined

  const { chainId, redirectUrl, tokens } = query
  const isSignInModalVisible = state.ui.modals[modalNames.SIGN_IN_MODAL_NAME]
  const isSignUpModalVisible = state.ui.modals[modalNames.SIGN_UP_MODAL_NAME]

  console.log(state)

  return {
    profileFields: chainState ? chainState.profile : {},
    redirectUrl,
    consumerChainId: chainId,
    requestedTokens: tokens,
    providerChainId: selectors.getChainId(state.interbit, PRIVATE),
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
    profileFields: PropTypes.shape,
    redirectUrl: PropTypes.string,
    providerChainId: PropTypes.string,
    consumerChainId: PropTypes.string,
    requestedTokens: PropTypes.arrayOf(PropTypes.string),
    blockchainDispatch: PropTypes.func.isRequired,
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

    // TODO: Probably dispatch a redux action to UI noting loading of chain situation

    await window.cli.loadChain(consumerChainId)

    const shareProfileTokensAction = actionCreators.shareProfileTokens({
      providerChainId,
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
      consumerChainId,
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
              <tr>
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
              <tr>
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
            {Object.keys(profileFields).map(key => (
              <tr>
                <td>{key}</td>
                <td>{profileFields[key]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <IconButton onClick={this.doConnectChains} text="Continue" />
        <IconButton text="Go Back" className="secondary" />
      </div>
    )

    return (
      <Grid>
        <div className="ibweb-page app-auth">
          <Row>
            <Col {...colLayout}>
              <img src={chairmanmeow} alt="App info access" />
              <h3>
                (Service: {consumerChainId}) wants to access the following
                identity information:
              </h3>
              {/* TODO: swap out these forms depending on state */}
              {formLoggedOut}
              {formMissingProfileField}
              {formMissingProfileFieldForm}
              {formContinueAuth}
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
