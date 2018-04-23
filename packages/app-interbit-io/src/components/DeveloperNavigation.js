import React, { Component } from 'react'
import { DeveloperNavigation as LriDeveloperNavigation } from 'lib-react-interbit'
import Navigation from './Navigation'

export default class DeveloperNavigation extends Component {
  render() {
    // eslint-disable-next-line
    const { component, interbitServices } = this.props

    const developerNavigation = (
      <LriDeveloperNavigation {...this.props} component={component} />
    )

    return (
      <Navigation
        interbitServices={interbitServices}
        container={developerNavigation}
        className="app-interbit-io developer"
      />
    )
  }
}
