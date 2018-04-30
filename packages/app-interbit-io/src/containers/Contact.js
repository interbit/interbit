import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown } from 'lib-react-interbit'

import layout from '../constants/layout'

const mapStateToProps = state => ({
  content: state.content.contact
})

class Contact extends Component {
  componentDidMount() {
    const addScript = document.createElement('script')
    addScript.setAttribute(
      'src',
      'https://webforms.pipedriveassets.com/webforms.min.js'
    )
    document.body.appendChild(addScript)
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { content } = this.props
    const colLayout = layout.colLayout.default

    return (
      <div className="ibweb-page contact">
        <Row>
          <Col {...colLayout}>
            <h1>{content.title}</h1>
            <Markdown markdown={content.intro} className="ibweb-intro" />
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <div className="pipedrive-container">
              <div
                className="pipedriveWebForms"
                data-pd-webforms="https://pipedrivewebforms.com/form/7148955b25f0e873fca3d9eb37c1118f906729"
              />
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Contact)
