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
} from 'interbit-ui-components'

import DeveloperNavigation from '../../components/DeveloperNavigation'
import urls from '../../constants/urls'

const mapStateToProps = state => ({
  placeholder: state.content.placeholder,
  sdkSignup: state.content.sdkSignup,
  ...state.content.developers
})

class DevelopersAppBlueprints extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { appBlueprints, sdkSignup } = this.props

    const appBlueprintsContent = (
      <div className="ibweb-page">
        <Row>
          <Col md={12}>
            <h1>{appBlueprints.title}</h1>
            <Markdown
              markdown={appBlueprints.intro.text}
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
              title={appBlueprints.section2.title}
              content={appBlueprints.section2.text}
            />
            <ContentBarDefault {...appBlueprints.section2.contentBars[0]} />
            <ContentBarDefault {...appBlueprints.section2.contentBars[0]} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Divider />
            <LinkBar {...appBlueprints.section3.linkBars[0]} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )

    return (
      <DeveloperNavigation {...this.props} component={appBlueprintsContent} />
    )
  }
}

export default connect(mapStateToProps)(DevelopersAppBlueprints)
