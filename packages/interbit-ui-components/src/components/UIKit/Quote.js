import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Media } from 'react-bootstrap'
import Divider from './Divider'

export default class Quote extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    author: PropTypes.string,
    publication: PropTypes.string,
    image: PropTypes.string.isRequired,
    className: PropTypes.string,
    callToActions: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.string,
        text: PropTypes.string
      })
    )
  }

  static defaultProps = {
    author: '',
    publication: '',
    className: '',
    callToActions: []
  }

  render() {
    const {
      content,
      author,
      publication,
      image,
      callToActions,
      className
    } = this.props
    return (
      <div className={`ibweb-quote ${className}`}>
        {content}
        <Divider />
        <Media>
          <Media.Left>
            <div className="img-container">
              <img src={image} alt={author || publication} />
            </div>
          </Media.Left>
          <Media.Body>
            {author && <h4>{author}</h4>}

            {!!callToActions.length &&
              callToActions.map(c => (
                <p key={c.text}>
                  <a href={c.to}>{c.text}</a>
                </p>
              ))}

            {publication && <p className="publication">{publication}</p>}
          </Media.Body>
        </Media>
      </div>
    )
  }
}
