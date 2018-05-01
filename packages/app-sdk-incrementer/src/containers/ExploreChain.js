import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { BlockExplorer } from 'interbit-ui-components'
import {
  NO_CHAIN_SELECTED,
  emptyChainState,
  toggleRawData,
  setSelectedBlockHash
} from '../redux/exploreChainReducer'

const mapStateToProps = (state, ownProps) => {
  const {
    exploreChain,
    exploreChain: { selectedChainId }
  } = state
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { chainId } = query

  return {
    ...exploreChain,
    selectedChain:
      exploreChain.chains[chainId || selectedChainId] ||
      exploreChain.chains[NO_CHAIN_SELECTED] ||
      emptyChainState(NO_CHAIN_SELECTED)
  }
}

const mapDispatchToProps = dispatch => ({
  doToggleRawData: () => dispatch(toggleRawData()),
  doSetSelectedBlockHash: hash => dispatch(setSelectedBlockHash(hash))
})

export class ExploreChain extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      name: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired,
      interbit: PropTypes.object.isRequired,
      blocks: PropTypes.arrayOf(PropTypes.object).isRequired,
      chainType: PropTypes.string,
      chainDispatch: PropTypes.func
    }).isRequired,
    showRawData: PropTypes.bool,
    doToggleRawData: PropTypes.func.isRequired,
    selectedBlockHash: PropTypes.string,
    doSetSelectedBlockHash: PropTypes.func.isRequired
  }

  static defaultProps = {
    showRawData: true,
    selectedBlockHash: null
  }

  render() {
    const {
      showRawData,
      doToggleRawData,
      selectedChain,
      selectedBlockHash,
      doSetSelectedBlockHash
    } = this.props
    return (
      <BlockExplorer
        selectedChain={selectedChain}
        showRawData={showRawData}
        doToggleRawData={doToggleRawData}
        selectedBlockHash={selectedBlockHash}
        doSetSelectedBlockHash={doSetSelectedBlockHash}
      />
    )
  }
}

export default reduxForm({
  form: 'ExploreChain',
  destroyOnUnmount: true
})(connect(mapStateToProps, mapDispatchToProps)(ExploreChain))
