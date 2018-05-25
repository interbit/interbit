import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Col, Form } from 'react-bootstrap'

export default class CancelOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orderId: ''
    }
  }

  dispatchCancelOrder = (chain, order) => {
    const cancelOrderAction = chain.getActions().cancelOrder(order)
    chain.dispatch(cancelOrderAction)
  }

  render() {
    const chain = this.props.chain
    const orderId = this.state.orderId

    return (
      <div className="order-book-panel">
        <h3>Cancel Order</h3>
        <Form className="cancel-order-form" horizontal>  
          <FormGroup controlId='formHorizontalOrderId'>
            <Col componentClass={ControlLabel} sm={3}>
              Order ID:
            </Col>
            <Col sm={9}>
              <FormControl type='text'
                value={orderId}
                onChange={e => this.setState({ orderId: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup>    
            <Col sm={9} smOffset={3}>
              <Button className="pull-right" onClick={() => this.dispatchCancelOrder(chain, { orderId })}>
                Cancel Order
              </Button>
            </Col>  
          </FormGroup>
        </Form>  
      </div>
    )
  }
}
