import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import queryString from 'query-string'
import { chainDispatch } from 'interbit-ui-tools'

import LinkedCovenant from '../components/LinkedCovenant'
import { actionCreators } from '../adapters/privateChainAdapter'
import { getExploreChainState } from '../redux/exploreChainReducer'

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { alias: chainAlias } = query

  const exploreChainState = getExploreChainState(state, chainAlias)

  return {
    selectedChain: {
      chainAlias: exploreChainState.chainId,
      state: {
        ...exploreChainState.state,
        interbit: exploreChainState.interbit
      }
    }
  }
}

const mapDispatchToProps = dispatch => ({
  resetForm: form => {
    dispatch(reset(form))
  },
  blockchainDispatch: chainAlias => action =>
    dispatch(chainDispatch(chainAlias, action))
})

const generateChainName = chain =>
  chain.state && chain.state.chainMetadata
    ? chain.state.chainMetadata.chainName
    : chain.chainAlias

export class InteractiveChains extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      chainAlias: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired
    }),
    resetForm: PropTypes.func.isRequired,
    blockchainDispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    selectedChain: null
  }

  render() {
    const { selectedChain, resetForm, blockchainDispatch } = this.props

    if (!selectedChain) {
      return <div>Loading...</div>
    }

    return (
      <Grid>
        <Row>
          <LinkedCovenant
            chainId={selectedChain.chainAlias}
            chainName={generateChainName(selectedChain)}
            raw={selectedChain.state}
            covenant={{ actionCreators }}
            reset={resetForm}
            blockchainDispatch={blockchainDispatch(selectedChain.chainAlias)}
          />
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveChains)
