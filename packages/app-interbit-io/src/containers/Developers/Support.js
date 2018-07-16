import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  Markdown,
  LinkBar,
  Divider
} from 'interbit-ui-components'

import layout from '../../constants/layout'

const mapStateToProps = state => ({
  linkBarContent: state.content.linkBars,
  ...state.content.developers
})

class DevelopersSupport extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { support, linkBarContent } = this.props
    const colLayout = layout.colLayout.developers

    return (
      <div className="ibweb-page dev-support">
        <Row className="ibweb-mg-md">
          <Col {...colLayout}>
            <h1>{support.title}</h1>
            <Markdown markdown={support.intro} className="ibweb-intro" />
          </Col>
        </Row>

        <Divider />

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.gitHub} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevelopersSupport)
