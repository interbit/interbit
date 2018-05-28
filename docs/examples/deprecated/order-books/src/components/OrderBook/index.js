import React from 'react'
import { Col, Row } from 'react-bootstrap'
import OpenOrders from './OpenOrders'
import Balance from './Balance'
import PlaceOrder from './PlaceOrder'
import CancelOrder from './CancelOrder'

import { connect } from 'react-redux'
import { chainUpdated } from '../../redux/chains'

import bootChain from '../../chain/bootChain'
import keys from '../../chain/keys'

class OrderBook extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      error: null
    }
  }

  componentDidMount () {
    this.setState({ loading: true }, () => {
      bootChain()
        .then((chain) => {
          this.chain = chain
          this.chainUpdated()
          this.chain.subscribe(this.chainUpdated)
          this.setState({ loading: false })
        })
        .catch((err) => {
          this.setState({ error: err.message })
        })
    })
  }

  chainUpdated = () => {
    const state = this.chain.getState()
    const chainState = this.chain.getChainState()
    this.props.chainUpdated('orderbook', state, chainState)
  }

  render () {
    if (this.state.error) {
      return (
        <div>
          <h2>Try again</h2>
          <p>{this.state.error}</p>
        </div>
      )
    }

    if (this.state.loading || !this.props.chain || !this.props.chain.app) {
      return <h2>loading...</h2>
    }

    const state = this.props.chain.app

    return (
      <div>
        <Row className="equal">
          <Col xs={7}>
            <PlaceOrder chain={this.chain} />
          </Col>
          <Col xs={5}>
            <CancelOrder chain={this.chain} />
          </Col>
        </Row>

        <Row>
          <Col xs={7}>
            <OpenOrders books={state.orderBook.books} />
          </Col>
          <Col xs={5}>
            <Balance balances={state.orderBook.balances[keys.public]} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { chain: state.orderbook }
}

const mapDispatchToProps = {
  chainUpdated
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook)
