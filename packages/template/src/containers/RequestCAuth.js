import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { cAuthRequests, selectors } from 'interbit-ui-tools'

import { APP_ACCOUNTS_CONNECT } from '../constants/urls'
import CHAIN_ALIASES from '../constants/chainAliases'

const mapStateToProps = state => {
  const isChainLoaded = selectors.isChainLoaded(state, {
    chainId: CHAIN_ALIASES.PRIVATE
  })
  const queryString = cAuthRequests.requestParams(state, {
    publicChainAlias: CHAIN_ALIASES.PUBLIC,
    privateChainAlias: CHAIN_ALIASES.PRIVATE,
    tokens: ['name', 'email']
  })

  return {
    isChainLoaded,
    queryString
  }
}

export class RequestCAuth extends Component {
  static propTypes = {
    isChainLoaded: PropTypes.bool,
    queryString: PropTypes.string
  }

  static defaultProps = {
    isChainLoaded: false,
    queryString: undefined
  }

  doRequestChainAuth = () => {
    const { queryString } = this.props

    const cAuthUrl = `${APP_ACCOUNTS_CONNECT}?${queryString}`

    console.log(`Redirecting to ${cAuthUrl}`)
    window.location = cAuthUrl
  }

  render() {
    const { isChainLoaded } = this.props

    if (!isChainLoaded) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Start the cAuth loop.</h3>
        <Button
          disabled={!isChainLoaded}
          onClick={this.doRequestChainAuth}
          bsStyle="default"
          className="Secondary-button Open pull-right">
          Request cAuth
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps)(RequestCAuth)
