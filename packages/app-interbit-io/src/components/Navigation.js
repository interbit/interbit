import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavigationWrapper } from 'lib-react-interbit'

import constants from '../constants'

export default class Navigation extends Component {
  static propTypes = {
    container: PropTypes.element.isRequired,
    className: PropTypes.string
  }

  static defaultProps = {
    className: ''
  }

  render() {
    const { container, className } = this.props
    const accountsUrl = constants.urls.APP_ACCOUNT

    const userIcon = <a href={accountsUrl}>Go to Accounts</a>

    return (
      <NavigationWrapper
        container={container}
        className={className}
        headerNavItems={constants.navigation.headerNav}
        footerNavItems={constants.navigation.footerNav}
        footerBottomLinks={constants.navigation.footerBottomLinks}
        account={{ userIcon }} // TODO: Pass in accounts path from DNS
      />
    )
  }
}
