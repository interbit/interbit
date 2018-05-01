import React, { Component } from 'react'
import { NotFound } from 'interbit-ui-components'

export default class NotFoundPage extends Component {
  render() {
    const links = [
      { title: 'Platform', to: '#' },
      { title: 'Developers', to: '#' },
      { title: 'Accounts', to: '#' },
      { title: 'App Directory', to: '#' },
      { title: 'Hosting', to: '#' },
      { title: 'Support', to: '#' }
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
