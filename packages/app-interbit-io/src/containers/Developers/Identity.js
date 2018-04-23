import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  Card,
  CodeBlock,
  ContentBox,
  Markdown,
  LinkBar,
  LinkBarSlack,
  Divider,
  Quote
} from 'lib-react-interbit'

import Navigation from '../../components/Navigation'
import urls from '../../constants/urls'

const mapStateToProps = state => ({
  placeholder: state.content.placeholder,
  sdkSignup: state.content.sdkSignup,
  ...state.content.developers
})

class DevelopersIdentity extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { identity, sdkSignup } = this.props

    const overview = (
      <div className="ibweb-page">
        <Row>
          <Col lg={2} />
          <Col lg={8}>
            <h1>{identity.title}</h1>
            <Markdown markdown={identity.intro.text} className="ibweb-intro" />
          </Col>
        </Row>
        <Row>
          <Col lg={2} />
          <Col lg={8}>
            <ContentBox
              title={identity.section2.title}
              content={identity.section2.text}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={1} />
          <Col lg={10}>
            <Quote {...identity.quote} />
          </Col>
        </Row>
        <Row>
          <Col lg={2} />
          <Col lg={8}>
            <ContentBox
              title={identity.section2.title}
              content={identity.section2.text}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={2} />
          <Col lg={4} md={6}>
            <Card {...identity.section3.cards[0]} />
          </Col>
          <Col lg={4} md={6}>
            <Card {...identity.section3.cards[0]} />
          </Col>
          <Col lg={2} />
        </Row>
        <Row>
          <Col lg={2} />
          <Col lg={4} md={6}>
            <Card {...identity.section3.cards[0]} />
          </Col>
          <Col lg={4} md={6}>
            <Card {...identity.section3.cards[0]} />
          </Col>
          <Col lg={2} />
        </Row>
        <Row>
          <Col lg={1} />
          <Col lg={10}>
            <CodeBlock content={identity.code.markdown} />
          </Col>
        </Row>
        <Row>
          <Col lg={2} />
          <Col lg={8}>
            <Divider />
            <LinkBar {...sdkSignup} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )

    return <Navigation container={overview} />
  }
}

export default connect(mapStateToProps)(DevelopersIdentity)
