import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { ContentBar, LinkBar, Markdown } from 'interbit-ui-components'

import layout from '../constants/layout'

const mapStateToProps = state => ({
  content: state.content.pricing,
  linkBarContent: state.content.linkBars
})

class Pricing extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content, linkBarContent } = this.props
    const colLayout = layout.colLayout.default

    return (
      <div className="ibweb-page pricing">
        <Row className="ibweb-mg-md-scr-xs">
          <Col {...colLayout}>
            <h1>{content.title}</h1>
            <ContentBar
              title={content.contentBar.title}
              image={content.contentBar.image}
              className="image-sm white">
              <p>{content.contentBar.content}</p>
            </ContentBar>
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <Markdown markdown={content.intro} className="ibweb-intro" />
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.pricingFree} />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <h2>{content.pricingTitle}</h2>
          </Col>
          {content.pricingTiles.map((p, i) => (
            <Col lg={3} md={6} key={p.title} className="pricing-tile">
              <div className="cont">
                <img src={p.image} alt={p.title} />
                <h3>
                  {p.title}
                  <sup>*</sup>
                </h3>
                <p>{p.price}</p>

                <ul>
                  {p.info.map(item => (
                    <li key={item.title}>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
          <Col md={12}>
            <p className="pricing-note">{content.pricingNote}</p>
          </Col>
        </Row>

        <Row className="ibweb-mg-sm">
          <Col {...colLayout}>
            <h2>{content.metrics.title}</h2>
          </Col>
          {content.metrics.sections.map((s, i) => (
            <Col key={s.title} md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0}>
              <div className="subsection">
                <h4>{s.title}</h4>
                <Markdown markdown={s.content} />
              </div>
            </Col>
          ))}
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.pricingEnterprise} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Pricing)
