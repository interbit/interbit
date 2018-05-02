import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  Markdown,
  LinkBar,
  LinkBarSlack,
  Divider
} from 'interbit-ui-components'

import urls from '../../constants/urls'

const mapStateToProps = state => ({
  linkBarContent: state.content.linkBars,
  ...state.content.developers
})

class DevelopersArchitecture extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { architecture, linkBarContent } = this.props
    const colLayout = {
      md: 12
    }

    return (
      <div className="ibweb-page dev-architecture">
        <Row>
          <Col md={12}>
            <h1>{architecture.title}</h1>
            <Markdown markdown={architecture.intro} className="ibweb-intro" />
          </Col>
        </Row>

        <div className="sections">
          {architecture.sections.map(s => (
            <Row key={s.title}>
              <Col {...colLayout}>
                <h2>{s.title}</h2>
                <Markdown markdown={s.intro} className="ibweb-intro" />
                <Markdown markdown={s.example} className="example" />
                <img
                  src={s.image}
                  alt={s.title}
                  className="ibweb-image-full-width"
                />
              </Col>
            </Row>
          ))}
        </div>

        <Divider />

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.architectureExample} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevelopersArchitecture)
