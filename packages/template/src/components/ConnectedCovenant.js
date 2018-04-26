import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Covenant } from 'lib-react-interbit'
import { reset } from 'redux-form'
import { chainDispatch } from 'interbit-middleware'

import chainAliases from '../constants/chainAliases'
import chainCovenant from '../interbit/public'

const mapStateToProps = state => ({
  raw: state
})

const mapDispatchToProps = dispatch => ({
  resetForm: form => {
    dispatch(reset(form))
  },
  publicDispatch: action => {
    dispatch(chainDispatch(chainAliases.PUBLIC, action))
  }
})

class ConnectedCovenant extends Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    raw: PropTypes.object,
    resetForm: PropTypes.func.isRequired,
    publicDispatch: PropTypes.func.isRequired
  }

  static defaultProps = {
    raw: {}
  }

  render() {
    const { raw, resetForm, publicDispatch } = this.props
    return (
      <Covenant
        raw={raw}
        covenant={chainCovenant}
        reset={resetForm}
        blockchainDispatch={publicDispatch}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedCovenant)
