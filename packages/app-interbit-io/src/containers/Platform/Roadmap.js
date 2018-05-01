import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { ContentBar, ContentBarDefault, Markdown } from 'interbit-ui-components'

import layout from '../../constants/layout'

const mapStateToProps = state => ({
  ...state.content.platform
})

class PlatformRoadmap extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { roadmap } = this.props
    const colLayout = layout.colLayout.default

    return (
      <div className="ibweb-page platform-roadmap">
        <Row className="ibweb-mg-md-scr-xs">
          <Col {...colLayout}>
            <h1>{roadmap.title}</h1>
            <ContentBar
              title={roadmap.attention.title}
              image={roadmap.attention.image}
              className="white image-sm">
              <Markdown markdown={roadmap.attention.content} />
            </ContentBar>
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <Markdown markdown={roadmap.intro} className="ibweb-intro" />
          </Col>
        </Row>

        {roadmap.features.map(f => (
          <div key={f.title}>
            <Row className="ibweb-mg-md-scr-xs">
              <Col {...colLayout}>
                <ContentBarDefault {...f.contentBar} />
              </Col>
            </Row>
            {f.description && (
              <Row>
                <Col {...colLayout}>
                  <h4>{f.description.title}</h4>
                  <Markdown markdown={f.description.content} />
                </Col>
              </Row>
            )}
            <Row>
              {f.properties.map((p, i) => (
                <Col key={p.title} md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0}>
                  <div className={`subsection ${p.className && p.className}`}>
                    <h4>{p.title}</h4>
                    <Markdown markdown={p.content} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ))}

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <Markdown
              markdown={roadmap.quote.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(PlatformRoadmap)
