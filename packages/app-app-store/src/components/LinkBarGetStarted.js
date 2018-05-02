import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { LinkBar } from 'interbit-ui-components'

import linkBars from '../content/linkBars'

const mapStateToProps = (state, ownProps) => {
  const linkBarContent = linkBars.getStarted

  return linkBarContent
}

export class LinkBarGetStarted extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }

  render() {
    const { ...linkBarContent } = this.props
    return (
      <LinkBar
        title={linkBarContent.title}
        content={linkBarContent.content}
        to={linkBarContent.to}
        image={linkBarContent.image}
        className="blue"
      />
    )
  }
}

export default connect(mapStateToProps)(LinkBarGetStarted)
