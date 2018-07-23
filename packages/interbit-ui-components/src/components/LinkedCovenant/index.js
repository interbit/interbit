import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import Covenant from '../Covenant'

export default class LinkedCovenant extends Component {
  static propTypes = {
    chainId: PropTypes.string,
    chainAlias: PropTypes.string.isRequired,
    // Note: We do not know the state shape and thus cannot define it in props
    // eslint-disable-next-line react/forbid-prop-types
    raw: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    covenant: PropTypes.object.isRequired,
    blockchainDispatch: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }

  static defaultProps = {
    chainId: undefined,
    raw: {}
  }

  render() {
    const {
      chainId,
      chainAlias,
      raw,
      covenant,
      blockchainDispatch,
      reset
    } = this.props

    return (
      <Panel>
        <Link to={chainAlias ? `/explore?alias=${chainAlias}` : '#'}>
          <h3>
            {chainAlias}
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
