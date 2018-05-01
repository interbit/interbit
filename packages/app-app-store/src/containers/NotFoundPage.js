import React, { Component } from 'react'
import { NotFound } from 'interbit-ui-components'

import constants from '../constants'

export default class NotFoundPage extends Component {
  render() {
    const links = [
      { title: 'Platform', to: constants.urls.APP_IB_IO_PLATFORM },
      { title: 'Developers', to: constants.urls.APP_IB_IO_DEVS },
      { title: 'Accounts', to: constants.urls.APP_ACCOUNT },
      { title: 'Store', to: constants.paths.HOME },
      { title: 'Support', to: constants.urls.APP_IB_IO_SUPPORT }
    ]

    return (
      <NotFound
        title="404. We can&rsquo;t seem to find the page you&rsquo;re looking for."
        linkListTitle="Here are some helpful links:"
        links={links}
      />
    )
  }
}
