import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header } from 'interbit-ui-components'

import navigation from '../constants/navigation'
import profilePic from '../img/profilePic.png'

export default class ProjectNavigation extends Component {
  static propTypes = {
    interbitServices: PropTypes.shape({
      accounts: PropTypes.shape({}),
      appStore: PropTypes.shape({})
    })
  }

  static defaultProps = {
    interbitServices: {}
  }

  render() {
    const { interbitServices } = this.props

    const accountsUrl = interbitServices.accounts
      ? interbitServices.accounts.serviceEndpoint
      : '#'

    const userProfile = (
      <div className="Logged-in-user">
        <img className="Profile-pic" src={profilePic} alt="profile" />
        <span>JohnSmith</span>
      </div>
    )

    return (
      <div className="App">
        <Header
          account={{
            to: accountsUrl,
            userAlias: userProfile
          }}
          navItems={interbitServicesAdapter(interbitServices)}
        />
      </div>
    )
  }
}

const interbitServicesAdapter = interbitServices => [
  {
    ...navigation.DEVELOPMENT,
    isHidden: process.env.NODE_ENV !== 'development'
  },
  {
    ...navigation.PROJECTS
  },
  {
    ...navigation.APP_STORE,
    to: interbitServices.appStore
      ? interbitServices.appStore.serviceEndpoint
      : '#'
  }
]
