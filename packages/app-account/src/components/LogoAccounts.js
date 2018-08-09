import React, { Component } from 'react'
import logoAccounts from '../assets/logoAccounts.svg'

export default class LogoAccounts extends Component {
  render() {
    return (
      <img
        className="hidden-xs"
        src={logoAccounts}
        alt="Interbit Accounts logo"
      />
    )
  }
}
