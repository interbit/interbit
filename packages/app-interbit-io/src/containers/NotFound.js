import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotFound } from 'interbit-ui-components'

import getInterbitServices from '../redux/getInterbitServices'
import Navigation from '../components/Navigation'

const mapStateToProps = state => ({
  interbitServices: getInterbitServices(state),
  ...state.content.notFound
})

class NotFoundPage extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { interbitServices, ...notFound } = this.props

    const notFoundContent = (
      <NotFound
        title={notFound.title}
        linkListTitle={notFound.linkListTitle}
        links={notFound.links}
      />
    )
    return (
      <Navigation
        interbitServices={interbitServices}
        container={notFoundContent}
      />
    )
  }
}

export default connect(mapStateToProps)(NotFoundPage)
