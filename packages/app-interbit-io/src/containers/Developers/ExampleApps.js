import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  ContentBar,
  IconButton,
  Markdown,
  LinkBar,
  Divider
} from 'interbit-ui-components'

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
                <p>{a.text}</p>
                <Divider />
                <IconButton to={a.githubUrl} text="View Source" />
              </ContentBar>
            ))}
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col {...colLayout}>
            <LinkBar {...linkBarContent.resources} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevelopersExampleApps)
