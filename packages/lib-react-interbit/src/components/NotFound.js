import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'

import LinkWrapper from './UIKit/LinkWrapper'
import Markdown from './Markdown'

export default class NotFound extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    linkListTitle: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ).isRequired
  }

  render() {
    const { title, linkListTitle, links } = this.props
    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    return (
      <div className="ibweb-page not-found">
        <Row>
          <Col {...colLayout}>
            <h1>{title}</h1>
            <Markdown
              markdown={linkListTitle}
              className="ibweb-intro ibweb-mg-sm"
            />
            <ul>
              {links.map(l => (
                <li key={l.title}>
                  <LinkWrapper to={l.to}>{l.title}</LinkWrapper>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
}
