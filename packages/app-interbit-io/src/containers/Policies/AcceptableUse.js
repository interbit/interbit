import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown } from 'interbit-ui-components'

import layout from '../../constants/layout'

const mapStateToProps = state => ({
  content: state.content.policies.acceptableUse
})

class AcceptableUse extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content } = this.props
    const colLayout = layout.colLayout.developers

    return (
      <div className="policy-content">
        <Row>
          <Col {...colLayout}>
            <h1>{content.title}</h1>
            <Markdown markdown={content.intro} className="ibweb-intro" />
          </Col>
        </Row>

        {content.sections.map(s => (
          <Row key={s.title}>
            <Col {...colLayout}>
              <h2>{s.title}</h2>

              {s.subsections.map(sub => (
                <Markdown
                  key={sub.title}
                  markdown={sub.content}
                  className={`ibweb-intro ${sub.className && sub.className}`}
                />
              ))}
            </Col>
          </Row>
        ))}
      </div>
    )
  }
}

export default connect(mapStateToProps)(AcceptableUse)
