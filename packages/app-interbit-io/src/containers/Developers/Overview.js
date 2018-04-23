import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  Card,
  ContentBar,
  Markdown,
  LinkBar,
  LinkBarSlack,
  Divider
} from 'lib-react-interbit'
import DeveloperNavigation from '../../components/DeveloperNavigation'
import getInterbitServices from '../../redux/getInterbitServices'
import urls from '../../constants/urls'
import layout from '../../constants/layout'

const mapStateToProps = state => ({
  interbitServices: getInterbitServices(state),
  linkBarContent: state.content.linkBars,
  ...state.content.developers
})

class DevelopersOverview extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { overview, linkBarContent } = this.props
    const colLayout = layout.colLayout.developers

    const overviewContent = (
      <div className="ibweb-page dev-overview">
        <Row>
          <Col {...colLayout}>
            <h1>{overview.heading}</h1>
            <Markdown markdown={overview.intro.text} className="ibweb-intro" />
          </Col>
        </Row>

        {/* product roadmap sidebar example
        <Row className="ibweb-dev-sidebar-list-row">
          <Col {...colLayout}>
            <ContentBarDefault {...overview.intro.contentBars[0]} />
          </Col>
          <Col lg={4} md={12} className="ibweb-dev-sidebar-col">
            <SidebarList
              title={overview.productRoadmap.title}
              contents={overview.productRoadmap.items}
            />
          </Col>
        </Row>
    */}
        <Row className="app-characteristics">
          <Col {...colLayout}>
            <h2>{overview.appsBuilt.title}</h2>
          </Col>
          {overview.appsBuilt.characteristics.map(c => (
            <Col key={c.title} md={6}>
              <h4>{c.title}</h4>
              <p>{c.content}</p>
            </Col>
          ))}
        </Row>

        <Row>
          <Col {...colLayout}>
            <h2>{overview.getStarted.title}</h2>
          </Col>
          {overview.getStarted.cards.map(c => (
            <Col key={c.title} md={6}>
              <Card {...c} className="sm" />
            </Col>
          ))}
        </Row>

        <Row className="common-services">
          <Col {...colLayout}>
            <h2>{overview.commonServices.title}</h2>
            {overview.commonServices.bars.map(b => (
              <ContentBar
                key={b.title}
                title={b.title}
                image={b.image}
                className={`image-sm ${b.className && b.className}`}>
                <Markdown markdown={b.content} />
                {b.callToActions &&
                  b.callToActions.map(a => (
                    <a key={a.text} href={a.to}>
                      {a.text}
                    </a>
                  ))}
              </ContentBar>
            ))}
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.accountChain} className="blue" />
          </Col>
        </Row>

        <Divider />

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.platformFeatures} />
            <LinkBar {...linkBarContent.productRoadmap} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )

    return <DeveloperNavigation {...this.props} component={overviewContent} />
  }
}

export default connect(mapStateToProps)(DevelopersOverview)
