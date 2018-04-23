import React, { Component } from 'react'
import logoAccounts from '../assets/logoAccounts.svg'

export default class LogoAccounts extends Component {
  render() {
    return (
      <div className="ibweb-logo">
        <img src={logoAccounts} alt="Interbit Accounts logo" />
      </div>
    )
  }
}
