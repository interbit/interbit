import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import CovenantForm from './CovenantForm'

// @connect(state => ({
//   raw: state.chain.state.app
// }))
export default class Covenant extends Component {
  static propTypes = {
    // Note: We do not know the state shape and thus cannot define it in props
    // eslint-disable-next-line react/forbid-prop-types
    raw: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    covenant: PropTypes.object.isRequired,
    blockchainDispatch: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  }

  static defaultProps = {
    raw: {}
  }

  render() {
    const { raw, covenant, blockchainDispatch, reset } = this.props

    return (
      <Grid>
        <Row className="show-grid">
          <Col md={6}>
            <pre style={{ textAlign: 'left' }}>
              {JSON.stringify(raw, null, 4)}
            </pre>
          </Col>
          <Col md={6}>
            <CovenantForm
              covenant={covenant}
              reset={reset}
              blockchainDispatch={blockchainDispatch}
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}
