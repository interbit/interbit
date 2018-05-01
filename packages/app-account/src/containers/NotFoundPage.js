import React, { Component } from 'react'
import { NotFound } from 'interbit-ui-components'

import paths from '../constants/paths'
import urls from '../constants/urls'

export default class NotFoundPage extends Component {
  render() {
    const links = [
      { title: 'Platform', to: urls.APP_IB_IO_PLATFORM },
      { title: 'Developers', to: urls.APP_IB_IO_DEVELOPERS },
      { title: 'Accounts', to: paths.HOME },
      { title: 'Store', to: urls.APP_STORE },
      { title: 'Support', to: urls.APP_IB_IO_DEVELOPERS_SUPPORT }
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
