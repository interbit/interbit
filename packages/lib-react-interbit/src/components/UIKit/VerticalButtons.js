import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row } from 'react-bootstrap'
import ButtonLink from './ButtonLink'

export default class VerticalButtons extends Component {
  static propTypes = {
    buttonLinks: PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string.isRequired,
      to: PropTypes.string
    })
  }

  static defaultProps = {
    buttonLinks: []
  }

  render() {
    const { buttonLinks } = this.props
    return (
      <Row>
        {buttonLinks.map(bl => (
          <ButtonLink key={bl.text} icon={bl.icon} text={bl.text} to={bl.to} />
        ))}
      </Row>
    )
  }
}
