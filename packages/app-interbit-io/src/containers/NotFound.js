import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NotFound } from 'interbit-ui-components'

const mapStateToProps = state => ({
  ...state.content.notFound
})

class NotFoundPage extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { ...notFound } = this.props

    return (
      <NotFound
        title={notFound.title}
        linkListTitle={notFound.linkListTitle}
        links={notFound.links}
      />
    )
  }
}

export default connect(mapStateToProps)(NotFoundPage)
