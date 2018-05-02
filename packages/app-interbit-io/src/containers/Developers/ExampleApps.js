import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  ContentBar,
  IconButton,
  Markdown,
  LinkBar,
  LinkBarSlack,
  Divider
} from 'interbit-ui-components'

import urls from '../../constants/urls'
import layout from '../../constants/layout'

const mapStateToProps = state => ({
  linkBarContent: state.content.linkBars,
  ...state.content.developers
})

class DevelopersExampleApps extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { exampleApps, linkBarContent } = this.props
    const colLayout = layout.colLayout.developers

    return (
      <div className="ibweb-page dev-examples">
        <Row>
          <Col {...colLayout}>
            <h1>{exampleApps.title}</h1>
            <Markdown markdown={exampleApps.intro} className="ibweb-intro" />
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            {exampleApps.apps.map(a => (
              <ContentBar
                key={a.title}
                title={a.title}
                image={a.image}
                className="image-sm">
                <p>
                  <a href={a.githubUrl}>View Source on GitHub</a>
                </p>
                <p>{a.text}</p>
                <Divider />
                {/* <IconButton to={a.appUrl} text="Open App" /> */}
                <IconButton to={a.storeUrl} text="View in Store" />
              </ContentBar>
            ))}
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.resources} />
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevelopersExampleApps)
