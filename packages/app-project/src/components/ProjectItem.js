import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Markdown from './Markdown'

export default class ProjectItem extends Component {
  static propTypes = {
    projectAlias: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    faIcon: PropTypes.string.isRequired
  }

  render() {
    const { projectAlias, name, description, faIcon } = this.props

    return (
      <Row className="Project-item">
        <Col sm={12} md={12}>
          <Row className="Project-container">
            <Col sm={1}>
              <i className={`fa ${faIcon}`} />
            </Col>
            <Col sm={11} md={10}>
              <LinkContainer
                key={projectAlias}
                to={`/projects/${projectAlias}`}>
                <h3 className="Project-title">{name}</h3>
              </LinkContainer>
              <p className="Status">Status/alerts/warnings here.</p>
              <Markdown
                className="Project-description"
                markdown={description}
              />
            </Col>
            <Col sm={12}>
              <hr />
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
