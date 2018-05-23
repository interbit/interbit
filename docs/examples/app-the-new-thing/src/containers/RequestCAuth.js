import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { cAuthRequests, selectors } from 'interbit-ui-tools'

import urls from '../constants/urls'
import chainAliases from '../constants/chainAliases'

const mapStateToProps = state => {
  const isChainLoaded = selectors.isChainLoaded(state, {
    chainAlias: chainAliases.PRIVATE
  })
  const queryString = cAuthRequests.requestParams(state, {
    publicChainAlias: chainAliases.PUBLIC,
    privateChainAlias: chainAliases.PRIVATE,
    tokens: ['name', 'email'],
    redirectUrl: `${window.location.origin}/cauth/complete`
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

    const cAuthUrl = `${urls.APP_ACCOUNTS_CONNECT}?${queryString}`

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
