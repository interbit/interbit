import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import queryString from 'query-string'
import { interbitRedux } from 'interbit-ui-tools'
import { LinkedCovenant } from 'interbit-ui-components'

import { PRIVATE } from '../constants/chainAliases'
import { createActionCreators } from '../adapters/my-projects.adapter'

const { chainDispatch, selectors } = interbitRedux

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { alias } = query

  const chainAlias = alias || PRIVATE
  const chainState = selectors.getChain(state, { chainAlias })
  const chainId = selectors.getChainId(state, { chainAlias })

  const actionCreators = createActionCreators(state)

  return {
    selectedChain: {
      chainId,
      chainAlias,
      state: {
        ...chainState,
        interbit: chainState.interbit
      },
      actionCreators
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

export class InteractiveChains extends Component {
  static propTypes = {
    selectedChain: PropTypes.shape({
      chainId: PropTypes.string,
      chainAlias: PropTypes.string.isRequired,
      state: PropTypes.object.isRequired,
      actionCreators: PropTypes.object
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
            chainAlias={selectedChain.chainAlias}
            raw={selectedChain.state}
            covenant={{ actionCreators: selectedChain.actionCreators || {} }}
            reset={resetForm}
            blockchainDispatch={blockchainDispatch(selectedChain.chainAlias)}
          />
        </Row>
      </Grid>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InteractiveChains)
