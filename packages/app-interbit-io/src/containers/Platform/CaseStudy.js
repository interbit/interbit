import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ContentBox } from 'lib-react-interbit'

import Navigation from '../../components/Navigation'

const mapStateToProps = state => ({
  title: 'Case Study',
  content: state.content.platform
})

class PlatformCaseStudy extends Component {
  render() {
    // eslint-disable-next-line
    const { title, content } = this.props
    const platform = <ContentBox title={title} content={content} />

    return <Navigation container={platform} />
  }
}

export default connect(mapStateToProps)(PlatformCaseStudy)
