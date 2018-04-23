import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown } from 'lib-react-interbit'

import PolicyNavigation from '../../components/PolicyNavigation'
import layout from '../../constants/layout'

const mapStateToProps = state => ({
  content: state.content.policies.trademark,
  sideBar: state.content.policies.sidebar
})

class Trademark extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content, sideBar } = this.props
    const colLayout = layout.colLayout.developers

    const trademarkContent = (
      <div className="ibweb-page policy">
        <Row>
          <Col {...colLayout}>
            <h1>{content.title}</h1>
            <Markdown markdown={content.content} className="ibweb-intro" />
          </Col>
        </Row>
      </div>
    )

    return <PolicyNavigation component={trademarkContent} sideBar={sideBar} />
  }
}

export default connect(mapStateToProps)(Trademark)
