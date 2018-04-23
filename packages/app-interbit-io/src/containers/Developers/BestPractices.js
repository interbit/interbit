import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  ContentBarDefault,
  ContentBox,
  Markdown,
  LinkBar,
  LinkBarSlack,
  Divider
} from 'lib-react-interbit'

import DeveloperNavigation from '../../components/DeveloperNavigation'
import urls from '../../constants/urls'

const mapStateToProps = state => ({
  placeholder: state.content.placeholder,
  sdkSignup: state.content.sdkSignup,
  ...state.content.developers
})

class DevelopersBestPractices extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { bestPractices, sdkSignup } = this.props

    const bestPracticesContent = (
      <div className="ibweb-page">
        <Row>
          <Col md={12}>
            <h1>{bestPractices.title}</h1>
            <Markdown
              markdown={bestPractices.intro.text}
              className="ibweb-intro"
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <LinkBar {...sdkSignup} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ContentBox
              title={bestPractices.section2.title}
              content={bestPractices.section2.text}
            />
            <ContentBarDefault {...bestPractices.section2.contentBars[0]} />
            <ContentBarDefault {...bestPractices.section2.contentBars[0]} />
            <ContentBarDefault {...bestPractices.section2.contentBars[0]} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ContentBox
              title={bestPractices.section3.title}
              content={bestPractices.section3.text}
            />
            <ContentBarDefault {...bestPractices.section3.contentBars[0]} />
            <ContentBarDefault {...bestPractices.section3.contentBars[0]} />
            <ContentBarDefault {...bestPractices.section3.contentBars[0]} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Divider />
            <LinkBar {...bestPractices.section4.linkBars[0]} />
            <LinkBar {...bestPractices.section4.linkBars[0]} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )

    return (
      <DeveloperNavigation {...this.props} component={bestPracticesContent} />
    )
  }
}

export default connect(mapStateToProps)(DevelopersBestPractices)
