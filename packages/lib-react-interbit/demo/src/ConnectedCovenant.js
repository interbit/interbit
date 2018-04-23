import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import { Covenant } from '../../src'
import chainCovenant from './testCovenant'

const mapStateToProps = state => ({
  raw: state.chainState
})

const mapDispatchToProps = dispatch => ({
  simulateChainDispatch: action => dispatch(action),
  resetForm: type => dispatch(reset(type))
})

class ConnectedCovenant extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    raw: PropTypes.object.isRequired,
    simulateChainDispatch: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  render() {
    const { raw, simulateChainDispatch, resetForm } = this.props
    return (
      <Covenant
        raw={raw}
        covenant={chainCovenant}
        reset={resetForm}
        blockchainDispatch={simulateChainDispatch}
      />
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConnectedCovenant)
