import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  ContentBox,
  Markdown,
  LinkBar,
  LinkBarSlack,
  Divider
} from 'interbit-ui-components'

import DeveloperNavigation from '../../components/DeveloperNavigation'
import getInterbitServices from '../../redux/getInterbitServices'
import urls from '../../constants/urls'
import doge from '../../assets/doge.jpg'

const mapStateToProps = state => ({
  interbitServices: getInterbitServices(state),
  sdkSignup: state.content.sdkSignup,
  ...state.content.developers
})

class DevelopersBuildingInterbitApps extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { building, sdkSignup } = this.props

    const buildingInterbitAppsContent = (
      <div className="ibweb-page">
        <Row>
          <Col md={12}>
            <h1>{building.title}</h1>
            <Markdown markdown={building.intro.text} className="ibweb-intro" />
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
              title={building.section2.title}
              content={building.section2.text}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <img
              src={doge}
              alt={building.section2.title}
              className="ibweb-image-full-width"
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Markdown
              markdown={building.section2.text}
              className="ibweb-intro"
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Divider />
            <LinkBar {...building.section3.linkBars[0]} />
            <LinkBar {...building.section3.linkBars[0]} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )

    return (
      <DeveloperNavigation
        {...this.props}
        component={buildingInterbitAppsContent}
      />
    )
  }
}

export default connect(mapStateToProps)(DevelopersBuildingInterbitApps)
