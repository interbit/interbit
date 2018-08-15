import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { interbitRedux } from 'interbit-ui-tools'
import { LinkedCovenant } from 'interbit-ui-components'

import { actionCreators as hubActionCreators } from '../components/hubCovenantAdapter'
import { actionCreators as spokeActionCreators } from '../components/spokeCovenantAdapter'

const { chainDispatch, selectors } = interbitRedux

const getChain = (state, chainAlias) => {
  const chainId = selectors.getChainId(state, { chainAlias })
  if (!chainId) {
    return undefined
  }

  const chainState = selectors.getChain(state, { chainAlias })
  return {
    chainId,
    chainAlias,
    state: {
      ...chainState,
      interbit: chainState.interbit
    }
  }
}

const mapStateToProps = state => {
  const hubChainId = selectors.getChainId(state, 'hub')

  const filteredChains = hubChainId
    ? [
        {
          chain: getChain('hub'),
          actionCreators: hubActionCreators
        },
        {
          chain: getChain('spoke1'),
          actionCreators: spokeActionCreators(hubChainId)
        },
        {
          chain: getChain('spoke2'),
          actionCreators: spokeActionCreators(hubChainId)
        }
      ].filter(({ chain }) => chain !== undefined)
    : []

  return {
    chains: filteredChains
  }
}

const mapDispatchToProps = dispatch => ({
  resetForm: form => {
    dispatch(reset(form))
  },
  blockchainDispatch: chainAlias => action => {
    dispatch(chainDispatch(chainAlias, action))
  }
})

export class InteractiveChains extends Component {
  static propTypes = {
    chains: PropTypes.arrayOf(
      PropTypes.shape({
        chainId: PropTypes.string,
        chainAlias: PropTypes.string,
        state: PropTypes.object
      })
    ),
    resetForm: PropTypes.func.isRequired,
    blockchainDispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    chains: null
  }

  render() {
    const { chains, resetForm, blockchainDispatch } = this.props

    if (!chains) {
      return <div>Loading...</div>
    }

    return (
      <Grid>
        {chains.map(({ chain, actionCreators }) => (
          <Row key={chain.chainId}>
            <LinkedCovenant
              chainId={chain.chainId}
              chainAlias={chain.chainAlias}
              raw={chain.state}
              covenant={{ actionCreators }}
              reset={resetForm}
              blockchainDispatch={blockchainDispatch(chain.chainAlias)}
            />
          </Row>
        ))}
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveChains)
