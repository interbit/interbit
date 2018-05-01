import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContentBar } from 'interbit-ui-components'

export default class ProjectBar extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    launchUrl: PropTypes.string.isRequired,
    isDeployed: PropTypes.bool,
    isPassing: PropTypes.bool
  }

  static defaultProps = {
    isDeployed: false,
    isPassing: false
  }

  render() {
    const { image, name, isDeployed, isPassing, launchUrl } = this.props

    return (
      <ContentBar
        image={image}
        title={name}
        titleTo="#"
        className="image-sm project-bar">
        {isDeployed ? (
          <div>
            {isPassing ? (
              <span className="status pass">
                <i className="fa fa-check-circle" />
                Build Passing
              </span>
            ) : (
              <span className="status fail">
                <i className="fa fa-times-circle" />
                Build Failing
              </span>
            )}
            <a href={launchUrl} className="app-url">
              <i className="fa fa-external-link" />
              Open App in Browser
            </a>
          </div>
        ) : (
          <p>Not Deployed</p>
        )}
      </ContentBar>
    )
  }
}
