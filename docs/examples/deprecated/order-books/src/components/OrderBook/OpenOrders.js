import React from 'react'
import { Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

const OpenOrders = ({ books }) => {
  let orders = []
  Object.keys(books).forEach(bidFlavour => {
    Object.keys(books[bidFlavour]).forEach(askFlavour => {
      books[bidFlavour][askFlavour].forEach(order => orders.push(order))
    })
  })

  return (
    <div className="order-book-panel open-orders">
      <h3>Open Orders</h3>
      <Table className="orderbook-table" fill striped bordered condensed hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Bid Flavor</th>
            <th>Ask Flavor</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.bidFlavour}</td>
              <td>{order.askFlavour}</td>
              <td>{order.price}</td>
              <td>{order.bidAmount}</td>
            </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}

OpenOrders.propTypes = {
  books: PropTypes.object.isRequired
}

OpenOrders.defaultProps = {
  books: {
    cad: {
      oil: [],
      usd: []
    },
    usd: {
      oil: [],
      cad: []
    },
    oil: {
      cad: [],
      usd: []
    }
  }
}

export default OpenOrders
