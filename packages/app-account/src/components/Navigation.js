import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Header } from 'interbit-ui-components'

import paths from '../constants/paths'
import navigation from '../constants/navigation'
import profilePic from '../img/profilePic.png'

export default class AccountNavigation extends Component {
  static propTypes = {
    interbitServices: PropTypes.shape({
      appStore: PropTypes.shape({}),
      projects: PropTypes.shape({})
    })
  }

  static defaultProps = {
    interbitServices: {}
  }

  render() {
    const { interbitServices } = this.props

    const userProfile = (
      <div className="Logged-in-user">
        <img className="Profile-pic" src={profilePic} alt="profile" />
        <span>JohnSmith</span>
      </div>
    )

    return (
      <Header
        account={{
          userAlias: userProfile,
          to: paths.ACCOUNT
        }}
        navItems={interbitServicesAdapter(interbitServices)}
      />
    )
  }
}

const interbitServicesAdapter = interbitServices => [
  {
    ...navigation.ACCOUNT
  },
  {
    ...navigation.DEVELOPMENT,
    isHidden: process.env.NODE_ENV !== 'development'
  },
  {
    ...navigation.PROJECTS,
    to: interbitServices.projects
      ? interbitServices.projects.serviceEndpoint
      : '#'
  },
  {
    ...navigation.APP_STORE,
    to: interbitServices.appStore
      ? interbitServices.appStore.serviceEndpoint
      : '#'
  }
]
