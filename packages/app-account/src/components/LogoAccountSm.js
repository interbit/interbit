import React, { Component } from 'react'
import iconAccounts from '../assets/icons/iconAccountsSm.svg'

export default class LogoAccountSm extends Component {
  render() {
    return (
      <img
        className="ibweb-icon visible-xs hidden-sm"
        src={iconAccounts}
        alt="Interbit Accounts icon"
      />
    )
  }
}
