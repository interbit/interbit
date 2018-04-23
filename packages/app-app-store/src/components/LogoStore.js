import React, { Component } from 'react'
import logoStore from '../assets/logoStore.svg'

export default class LogoStore extends Component {
  render() {
    return (
      <div className="ibweb-logo">
        <img src={logoStore} alt="Store Logo" />
      </div>
    )
  }
}
