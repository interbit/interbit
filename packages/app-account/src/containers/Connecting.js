import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ConnectingTo } from 'interbit-ui-components'

import spinner from '../assets/spinner.gif'

const mapStateToProps = state => ({
  content: state.content.connecting
})

class Connecting extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content } = this.props

    return (
      <ConnectingTo
        title={content.title}
        content={content.content}
        image={content.image}
        spinner={spinner}
      />
    )
  }
}

export default connect(mapStateToProps)(Connecting)
