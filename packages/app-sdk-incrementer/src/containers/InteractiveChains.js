import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import queryString from 'query-string'
import { chainDispatch } from 'interbit-ui-tools'

import LinkedCovenant from '../components/LinkedCovenant'
import { actionCreators } from '../components/incrementCovenantAdapter'
import { getExploreChainState } from '../redux/exploreChainReducer'

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { chainId } = query

  return {
    selectedChain: getExploreChainState(state, chainId || 'increment')
  }
}

const mapDispatchToProps = dispatch => ({
  resetForm: form => {
    dispatch(reset(form))
  },
  blockchainDispatch: chainAlias => action =>
    dispatch(chainDispatch(chainAlias, action))
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

  return chainName || covenant || chain.covenantName
}

export class InteractiveChains extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      chainId: PropTypes.string.isRequired,
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
            chainId={selectedChain.chainId}
            chainName={generateChainName(selectedChain)}
            raw={selectedChain.state}
            covenant={{ actionCreators }}
            reset={resetForm}
            blockchainDispatch={blockchainDispatch(selectedChain.chainId)}
          />
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InteractiveChains)
