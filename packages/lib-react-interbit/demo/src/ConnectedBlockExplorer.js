import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import BlockExplorer from '../../src/components/BlockExplorer'
import { toggleRawData, setSelectedBlockHash } from './testBlockExplorerReducer'

const mapStateToProps = state => {
  const stateSlice = state.blockExplorer
  return {
    ...stateSlice,
    selectedChain: stateSlice.chains[stateSlice.selectedChainId]
  }
}

const mapDispatchToProps = dispatch => ({
  doToggleRawData: () => dispatch(toggleRawData()),
  doSetSelectedBlockHash: hash => dispatch(setSelectedBlockHash(hash))
})

class ConnectedBlockExplorer extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      name: PropTypes.string,
      state: PropTypes.object
    }).isRequired,
    doToggleRawData: PropTypes.func.isRequired,
    showRawData: PropTypes.bool,
    doSetSelectedBlockHash: PropTypes.func.isRequired,
    selectedBlockHash: PropTypes.string
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
        showRawData={showRawData}
        doToggleRawData={doToggleRawData}
        selectedChain={selectedChain}
        doSetSelectedBlockHash={doSetSelectedBlockHash}
        selectedBlockHash={selectedBlockHash}
      />
    )
  }
}

export default reduxForm({
  form: 'ConnectedChainCovenant',
  destroyOnUnmount: true
})(connect(mapStateToProps, mapDispatchToProps)(ConnectedBlockExplorer))
