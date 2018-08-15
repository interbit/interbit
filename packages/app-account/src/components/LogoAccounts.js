import React, { Component } from 'react'
import iconAccountsSm from '../assets/icons/iconAccountsSm.svg'
import wordmarkAccounts from '../assets/wordmarkAccounts.svg'

export default class LogoAccounts extends Component {
  render() {
    return (
      <div className="ibweb-app-logo">
        <img
          src={iconAccountsSm}
          className="icon"
          alt="Interbit Accounts App icon"
        />
        <img
          src={wordmarkAccounts}
          alt="Interbit Accounts App wordmark"
          className="wordmark"
        />
      </div>
    )
  }
}
