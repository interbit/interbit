import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { LinkBar, Card, ContentBox, Markdown } from 'interbit-ui-components'

import layout from '../constants/layout'
import headerHome from '../assets/headerHome.jpg'

const mapStateToProps = state => ({
  linkBarContent: state.content.linkBars,
  ...state.content.home
})

class Home extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { title, linkBarContent, ...home } = this.props
    const colLayout = layout.colLayout.default

    return (
      <div className="ibweb-page home">
        <Row>
          <Col md={12}>
            <img
              src={headerHome}
              alt={title}
              className="ibweb-image-full-width bleed header"
            />
          </Col>
        </Row>
        <Row>
          <Col {...colLayout}>
            <h1>{title}</h1>
            <Markdown markdown={home.intro.content} className="ibweb-intro" />
          </Col>
        </Row>
        <Row>
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.getStarted} />
            <LinkBar {...linkBarContent.forBusiness} />
          </Col>
        </Row>
        <Row className="ibweb-mg-sm-scr-xs">
          {home.section3.cards.map((c, i) => (
            <Col
              key={c.title}
              xs={12}
              md={6}
              lg={4}
              lgOffset={i % 2 === 0 ? 2 : 0}>
              <Card {...c} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col {...colLayout}>
            <ContentBox
              title={home.weDoBlockChain.title}
              content={home.weDoBlockChain.content}
            />
          </Col>
        </Row>
        <Row className="ibweb-mg-md ibweb-mg-sm-scr-xs">
          {home.cardsSection.cards.map((c, i) => (
            <Col key={c.title} md={6} lg={4} lgOffset={i % 2 === 0 ? 2 : 0}>
              <Card {...c} />
            </Col>
          ))}
        </Row>
        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.productRoadmap} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Home)
