import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  Card,
  ContentBox,
  Markdown,
  Quote,
  LinkBar
} from 'interbit-ui-components'

import layout from '../../constants/layout'

const mapStateToProps = state => ({
  ...state.content.platform,
  linkBarContent: state.content.linkBars
})

class Platform extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { platform, linkBarContent } = this.props
    const colLayout = layout.colLayout.default

    return (
      <div className="ibweb-page platform">
        <Row>
          <Col md={12}>
            <img
              src={platform.headerImage.image}
              alt={platform.headerImage.title}
              className="ibweb-image-full-width bleed header"
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-sm-scr-xs">
          <Col {...colLayout}>
            <h1>{platform.title}</h1>
            <Markdown
              markdown={platform.intro.content}
              className="ibweb-intro"
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          {platform.intro.cards.map((c, i) => (
            <Col key={c.title} md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0}>
              <Card {...c} />
            </Col>
          ))}
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <Quote {...platform.quote} />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg ibweb-mg-md-scr-xs">
          <Col {...colLayout}>
            <ContentBox {...platform.takeAdvantage} />
          </Col>
        </Row>

        <Row className="logos">
          <Col {...colLayout}>
            <h4>{platform.logos.title}</h4>

            {platform.logos.logos.map((l, i) => (
              <Col key={l.alt} md={3} xs={6}>
                <img
                  src={l.src}
                  alt={l.alt}
                  className="ibweb-image-full-width logo"
                />
              </Col>
            ))}
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.forBusiness} />
          </Col>
        </Row>

        <Row className="ibweb-mg-md ibweb-mg-md-scr-xs">
          <Col {...colLayout}>
            <ContentBox {...platform.patentPending} />
          </Col>
        </Row>
        <Row className="ibweb-mg-md">
          <Col md={12} lg={10} lgOffset={1}>
            <img
              className="ibweb-image-full-width"
              src={platform.patentPending.image.src}
              alt={platform.patentPending.image.alt}
            />
          </Col>
        </Row>

        <Row className="ibweb-mg-md">
          {platform.patentPending.cards.map((c, i) => (
            <Col key={c.title} md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0}>
              <Card {...c} />
            </Col>
          ))}
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col md={12} lg={10} lgOffset={1} className="ibweb-metrics">
            <ContentBox
              title={platform.metrics.title}
              content={platform.metrics.content}
            />
            <div>
              {platform.metrics.metricBoxes.map(m => (
                <div key={m.title} className="section">
                  <h3>{m.title}</h3>
                  <Markdown markdown={m.content} />
                  <img
                    src={m.image}
                    alt={m.title}
                    className="ibweb-image-full-width"
                  />
                </div>
              ))}
            </div>
            <LinkBar {...linkBarContent.getStarted} />
            <LinkBar {...linkBarContent.downloadSDK} className="blue" />
          </Col>
        </Row>

        {platform.apps.map(p => (
          <div key={p.title} className="app-section">
            <Row className="ibweb-mg-md">
              <Col {...colLayout}>
                <h2>{p.title}</h2>
                <Markdown markdown={p.content} className="ibweb-intro" />
                <div className="links">
                  {p.callToActions &&
                    p.callToActions.map(c => (
                      <p key={c.text}>
                        <a href={c.to}>{c.text}</a>
                      </p>
                    ))}
                </div>
                <img
                  src={p.image}
                  alt={p.title}
                  className="ibweb-image-full-width"
                />
              </Col>
            </Row>
            <Row>
              {p.cards.map((c, i) => (
                <Col md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0} key={c.title}>
                  <Card {...c} className="sm" />
                </Col>
              ))}
            </Row>
          </div>
        ))}

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.productRoadmap} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Platform)
