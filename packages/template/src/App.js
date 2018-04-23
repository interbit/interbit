import { Welcome } from 'lib-react-interbit'
import React, { Component } from 'react'
import logo from './logo.svg'
import './css/App.css'
import ConnectedCovenant from './components/ConnectedCovenant'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Interbit</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Welcome />
        <ConnectedCovenant />
      </div>
    )
  }
}
