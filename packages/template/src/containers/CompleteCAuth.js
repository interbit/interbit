import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { chainDispatch, selectors } from 'interbit-ui-tools'

import { actionCreators } from '../interbit/private'
import CHAIN_ALIASES from '../constants/chainAliases'

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { chainId: providerChainId, joinName } = query

  const isChainLoaded = selectors.isChainLoaded(state, {
    chainId: CHAIN_ALIASES.PRIVATE
  })

  return {
    isChainLoaded,
    providerChainId,
    joinName
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action =>
    dispatch(chainDispatch(CHAIN_ALIASES.PRIVATE, action))
})

export class CompleteCAuth extends Component {
  static propTypes = {
    isChainLoaded: PropTypes.bool,
    providerChainId: PropTypes.string,
    joinName: PropTypes.string,
    blockchainDispatch: PropTypes.func
  }

  static defaultProps = {
    isChainLoaded: false,
    providerChainId: null,
    joinName: null,
    blockchainDispatch: () => {}
  }

  doCompleteChainAuth = async () => {
    const { providerChainId, joinName, blockchainDispatch } = this.props

    const mountProfileTokensAction = actionCreators.authorized({
      providerChainId,
      joinName
    })

    await blockchainDispatch(mountProfileTokensAction)
  }

  render() {
    const { isChainLoaded, providerChainId, joinName } = this.props

    if (!isChainLoaded) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Complete the cAuth loop.</h3>
        <div>{`Join: ${joinName} to ${providerChainId}`}</div>
        <Button
          disabled={!isChainLoaded}
          onClick={this.doCompleteChainAuth}
          bsStyle="default"
          className="Secondary-button Open pull-right">
          Complete cAuth
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteCAuth)
