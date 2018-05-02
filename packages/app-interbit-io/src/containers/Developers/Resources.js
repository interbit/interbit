import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown, LinkBarSlack, Divider } from 'interbit-ui-components'

import urls from '../../constants/urls'
import layout from '../../constants/layout'

const mapStateToProps = state => ({
  ...state.content.developers
})

class DevelopersResources extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { resources } = this.props
    const colLayout = layout.colLayout.developers

    return (
      <div className="ibweb-page dev-resources">
        <Row>
          <Col {...colLayout}>
            <h1>{resources.title}</h1>
            <Markdown markdown={resources.intro} className="ibweb-intro" />
          </Col>
        </Row>

        <div className="sections">
          {resources.sections.map(s => (
            <Row key={s.title} className="ibweb-mg-md">
              <Col {...colLayout}>
                <h2>{s.title}</h2>
                {s.text && (
                  <Markdown markdown={s.text} className="ibweb-intro" />
                )}
                {s.callToActions.map(a => (
                  <p key={a.to}>
                    <a href={a.to} target="_blank">
                      {a.to}
                    </a>
                  </p>
                ))}
              </Col>
            </Row>
          ))}
        </div>

        <Divider />

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevelopersResources)
