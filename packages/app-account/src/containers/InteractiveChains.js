import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import queryString from 'query-string'
import { interbitRedux } from 'interbit-ui-tools'

import { PRIVATE } from '../constants/chainAliases'
import LinkedCovenant from '../components/LinkedCovenant'
import { actionCreators } from '../adapters/my-account.adapter'

const { chainDispatch, selectors } = interbitRedux

const mapStateToProps = (state, ownProps) => {
  const {
    location: { search }
  } = ownProps
  const query = queryString.parse(search)
  const { alias } = query

  const chainAlias = alias || PRIVATE
  const chainState = selectors.getChain(state, chainAlias)

  return {
    selectedChain: {
      chainAlias,
      state: {
        ...chainState,
        interbit: chainState.interbit
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
            chainName={selectedChain.chainAlias}
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
