import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ModalWrapper, ContentBar, IconButton } from 'interbit-ui-components'

export default class ModalAppAccess extends Component {
  static propTypes = {
    appName: PropTypes.string.isRequired,
    image: PropTypes.string
  }

  static defaultProps = {
    image: undefined
  }

  render() {
    const { image, appName } = this.props

    const header = (
      <div>
        <ContentBar image={image} className="image-sm" title={appName}>
          <p>
            This information is being shared with {appName}. Control access to
            your information, etc adipiscing elit, sed do eiusmod tempor inc.
          </p>
        </ContentBar>
      </div>
    )

    const body = (
      <div>
        <ul>
          <li>
            <h4>Username / Alias:</h4>
            <p>BlueSteel</p>
          </li>
          <li>
            <h4>Email:</h4>
            <p>derek@reallyreallygoodlookingpeople.com</p>
          </li>
        </ul>
        <IconButton className="destructive margin-md" text="Remove Access" />
      </div>
    )

    const footer = (
      <div>
        <a href="#">Cancel</a>
      </div>
    )

    return <ModalWrapper header={header} body={body} footer={footer} />
  }
}
