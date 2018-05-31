import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import { Covenant } from 'interbit-ui-components'

export default class LinkedCovenant extends Component {
  static propTypes = {
    chainId: PropTypes.string.isRequired,
    chainName: PropTypes.string.isRequired,
    // Note: We do not know the state shape and thus cannot define it in props
    // eslint-disable-next-line react/forbid-prop-types
    raw: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    covenant: PropTypes.object.isRequired,
    blockchainDispatch: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }

  static defaultProps = {
    raw: {}
  }

  render() {
    const {
      chainId,
      chainName,
      raw,
      covenant,
      blockchainDispatch,
      reset
    } = this.props

    return (
      <Panel>
        <Link to={chainId ? `/explore?chainId=${chainId}` : '#'}>
          <h3>
            {chainName}
            {chainId ? ` (${chainId.substr(0, 16)}...)` : ''}
          </h3>
        </Link>
        <Covenant
          raw={raw}
          covenant={covenant}
          reset={reset}
          blockchainDispatch={blockchainDispatch}
        />
      </Panel>
    )
  }
}
