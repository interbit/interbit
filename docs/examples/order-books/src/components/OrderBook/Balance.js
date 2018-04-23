import React from 'react'
import { Table } from 'react-bootstrap'

const Balance = ({balances}) => (
  <div className="order-book-panel">
    <h3>Balances</h3>
    <Table fill striped bordered condensed hover>
      <thead>
        <tr>
          <th>Flavor</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(balances).map(key => (
          <tr key={key}>
            <td>{key}</td>
            <td>{balances[key]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

export default Balance
