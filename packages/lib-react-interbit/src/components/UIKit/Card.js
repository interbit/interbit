import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LinkWrapper from './LinkWrapper'

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
    callToActions: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,
        text: PropTypes.string.isRequired,
        clickHandler: PropTypes.func
      })
    )
  }

  static defaultProps = {
    className: '',
    callToActions: undefined
  }

  render() {
    const { title, content, image, callToActions, className } = this.props
    return (
      <div className={`ibweb-card ${className}`}>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p className="content">{content}</p>
        {callToActions && (
          <div className="links">
            {callToActions.map(c => (
              <p key={c.text}>
                <LinkWrapper to={c.to} clickHandler={c.clickHandler}>
                  {c.text}
                </LinkWrapper>
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }
}
