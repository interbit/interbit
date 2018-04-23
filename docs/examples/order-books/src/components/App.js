import React, { Component } from 'react'
import { Grid, PageHeader } from 'react-bootstrap'
import OrderBook from './OrderBook'
import ChainDetails from './ChainDetails'
import '../theme.css'

class App extends Component {
  render() {
    return (
      <Grid>
		<PageHeader>Order Book</PageHeader>
        <OrderBook />
        <ChainDetails />
      </Grid>
    )
  }
}

export default App;
