import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { chainDispatch } from 'interbit-ui-tools'

import LinkedCovenant from '../components/LinkedCovenant'
import { actionCreators as hubActionCreators } from '../components/hubCovenantAdapter'
import { actionCreators as spokeActionCreators } from '../components/spokeCovenantAdapter'

const mapStateToProps = state => {
  const chains =
    state.exploreChain && state.exploreChain.chains
      ? state.exploreChain.chains
      : {}

  const hubChainId = state.interbit.chainData
    ? state.interbit.chainData.chains.hub
    : ''

  const filteredChains = [
    { chain: chains.hub, actionCreators: hubActionCreators },
    { chain: chains.spoke1, actionCreators: spokeActionCreators(hubChainId) },
    { chain: chains.spoke2, actionCreators: spokeActionCreators(hubChainId) }
  ].filter(({ chain }) => chain !== undefined)

  return {
    chains: filteredChains
  }
}

const mapDispatchToProps = dispatch => ({
  resetForm: form => {
    dispatch(reset(form))
  },
  interbitDispatch: chainAlias => action => {
    dispatch(chainDispatch(chainAlias, action))
  }
})

const generateChainName = chain => {
  const chainName =
    chain.state && chain.state.chainMetadata
      ? chain.state.chainMetadata.chainName
      : undefined
  const covenant =
    chain.state && chain.state.chainMetadata
      ? chain.state.chainMetadata.covenant
      : undefined

  return chainName || covenant || chain.name
}

export class InteractiveChains extends Component {
  static propTypes = {
    chains: PropTypes.arrayOf(
      PropTypes.shape({
        chainId: PropTypes.string,
        name: PropTypes.string,
        state: PropTypes.object
      })
    ),
    resetForm: PropTypes.func.isRequired,
    interbitDispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    chains: null
  }

  render() {
    const { chains, resetForm, interbitDispatch } = this.props

    if (!chains) {
      return <div>Loading...</div>
    }

    return (
      <Grid>
        {chains.map(({ chain, actionCreators }) => (
          <Row key={chain.chainId}>
            <LinkedCovenant
              chainId={chain.chainId}
              chainName={generateChainName(chain)}
              raw={chain.state}
              covenant={{
                actionCreators
              }}
              reset={resetForm}
              blockchainDispatch={interbitDispatch(chain.chainId)}
            />
          </Row>
        ))}
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveChains)
