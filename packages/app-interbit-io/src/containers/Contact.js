import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Markdown } from 'interbit-ui-components'

import layout from '../constants/layout'
import pipedrive from '../constants/pipedrive'

const mapStateToProps = state => ({
  content: state.content.contact
})

class Contact extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { content } = this.props
    const colLayout = layout.colLayout.default

    const uuid = Math.random()
      .toString(36)
      .substring(7)
    const iframeSrc = `https://pipedrivewebforms.com/form/${
      pipedrive.CONTACT_FORM_ID
    }?embeded=1&uudid=${uuid}`

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
                data-pd-webforms={`https://pipedrivewebforms.com/form/${
                  pipedrive.CONTACT_FORM_ID
                }`}
                data-uuid={uuid}>
                <iframe title="ib-pipedrive-form" src={iframeSrc} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Contact)
