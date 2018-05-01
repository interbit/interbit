import React, { Component } from 'react'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { BlockExplorer } from 'interbit-ui-components'
import {
  getExploreChainState,
  toggleRawData,
  setSelectedBlockHash
} from '../redux/exploreChainReducer'

const mapStateToProps = (state, ownProps) => {
  const {
    exploreChain: { showRawData, selectedBlockHash }
  } = state
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { chainId } = query

  return {
    showRawData,
    selectedBlockHash,
    selectedChain: getExploreChainState(state, chainId)
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
      covenantName: PropTypes.string,
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
