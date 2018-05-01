import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown } from 'interbit-ui-components'

import layout from '../../constants/layout'

const mapStateToProps = state => ({
  content: state.content.policies.privacy
})

class Privacy extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content } = this.props
    const colLayout = layout.colLayout.developers

    return (
      <div className="policy-content">
        <Row>
          <Col {...colLayout}>
            <h1>{content.title}</h1>
            <Markdown markdown={content.content} className="ibweb-intro" />

            <div className="ibweb-intro">
              <p>
                {content.address.map(a => (
                  <span key={a}>
                    {a}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Privacy)
