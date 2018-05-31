import React, { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Form, Col } from 'react-bootstrap'

export default class PlaceOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bidAmount: 10,
      price: 1,
      bidFlavour: 'oil',
      askFlavour: 'cad'
    }
  }

  dispatchPlaceOrder = (chain, order) => {
    const placeorderAction = chain.getActions().placeOrder(order)
    chain.dispatch(placeorderAction)
  }

  render() {
    const chain = this.props.chain
    const {
      bidAmount,
      price,
      bidFlavour,
      askFlavour
    } = this.state

    return (
      <div className="order-book-panel">
        <h3>Place Order</h3>
        <Form className="place-order-form" horizontal>
          <FormGroup controlId='formHorizontalBidAmount'>
            <Col componentClass={ControlLabel} sm={3}>
              Bid Amount:
            </Col>
            <Col sm={9}>
              <FormControl type='number'
                value={bidAmount}
                onChange={e => this.setState({ bidAmount: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalprice'>
            <Col componentClass={ControlLabel} sm={3}>
              Price:
            </Col>
            <Col sm={9}>
              <FormControl type='number'
                value={price}
                onChange={e => this.setState({ price: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalBidFlavour'>
            <Col componentClass={ControlLabel} sm={3}>
              Bid Flavor:
            </Col>
            <Col sm={9}>
              <FormControl type='text'
                value={bidFlavour}
                onChange={e => this.setState({ bidFlavour: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalAskFlavour'>
            <Col componentClass={ControlLabel} sm={3}>
              Ask Flavor:
            </Col>
            <Col sm={9}>
              <FormControl type='text'
                value={askFlavour}
                onChange={e => this.setState({ askFlavour: e.target.value })}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={9} smOffset={3}>
              <Button className="pull-right" onClick={() => this.dispatchPlaceOrder(chain, { bidAmount, price, bidFlavour, askFlavour })}>
                Place Order
              </Button>
            </Col>  
          </FormGroup>
        </Form>  
      </div>
    )
  }
}
