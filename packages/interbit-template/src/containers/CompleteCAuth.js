import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { chainDispatch, selectors } from 'interbit-ui-tools'
import { cAuthConsumerCovenant as covenant } from 'interbit-covenant-tools'

import chainAliases from '../constants/chainAliases'

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { providerChainId, joinName, error } = query

  const isChainLoaded = selectors.isChainLoaded(state, {
    chainAlias: chainAliases.PRIVATE
  })

  return {
    isChainLoaded,
    providerChainId,
    joinName,
    error
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action =>
    dispatch(chainDispatch(chainAliases.PRIVATE, action))
})

export class CompleteCAuth extends Component {
  static propTypes = {
    isChainLoaded: PropTypes.bool,
    providerChainId: PropTypes.string,
    joinName: PropTypes.string,
    blockchainDispatch: PropTypes.func,
    error: PropTypes.string
  }

  static defaultProps = {
    isChainLoaded: false,
    providerChainId: null,
    joinName: null,
    blockchainDispatch: () => {},
    error: ''
  }

  doCompleteChainAuth = async () => {
    const { providerChainId, joinName, blockchainDispatch } = this.props

    const mountProfileTokensAction = covenant.actionCreators.authorized({
      providerChainId,
      joinName
    })

    await blockchainDispatch(mountProfileTokensAction)
  }

  render() {
    const { isChainLoaded, providerChainId, joinName, error } = this.props

    if (!isChainLoaded) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>User cancelled the app&rsquo;s authoriztion request</div>
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
