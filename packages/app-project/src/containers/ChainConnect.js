import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { chainDispatch } from 'interbit-ui-tools'

import { getExploreChainState } from '../redux/exploreChainReducer'
import { actionCreators } from '../interbit/my-projects'

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { providerChainId, joinName } = query

  return {
    selectedChain: getExploreChainState(state),
    providerChainId,
    joinName
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch('myProjects', action))
})

export class ChainConnect extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      chainId: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired,
      chainDispatch: PropTypes.func
    }),
    providerChainId: PropTypes.string,
    joinName: PropTypes.string
  }

  static defaultProps = {
    selectedChain: null,
    providerChainId: null,
    joinName: null
  }

  doCompleteChainAuth = async () => {
    const { providerChainId, joinName, blockchainDispatch } = this.props

    // TODO: Dispatch rx action to indicate doing the join

    await window.cli.loadChain(providerChainId)

    const mountProfileTokensAction = actionCreators.authorized({
      providerChainId,
      joinName
    })

    await blockchainDispatch(mountProfileTokensAction)

    // TODO: Dispatch rx action to indicate done the join
  }

  render() {
    const { selectedChain } = this.props

    if (!selectedChain) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Complete the cAuth loop.</h3>
        <pre>{JSON.stringify(selectedChain.state, null, 4)}</pre>
        <Button
          disabled={!selectedChain}
          onClick={this.doCompleteChainAuth}
          bsStyle="default"
          className="Secondary-button Open pull-right">
          Complete cAuth
        </Button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChainConnect)
