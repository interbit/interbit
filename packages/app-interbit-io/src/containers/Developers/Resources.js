import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown } from 'interbit-ui-components'

import layout from '../../constants/layout'

const mapStateToProps = state => ({
  linkBarContent: state.content.linkBars,
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

        <div className="sections ibweb-mg-xx-lg">
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
      </div>
    )
  }
}

export default connect(mapStateToProps)(DevelopersResources)
