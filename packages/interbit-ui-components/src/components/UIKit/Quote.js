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
    callToAction: PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string
    })
  }

  static defaultProps = {
    author: '',
    publication: '',
    callToAction: undefined
  }

  render() {
    const { content, author, publication, image, callToAction } = this.props
    return (
      <div className="ibweb-quote">
        {content}
        <Divider />
        <Media>
          <Media.Left>
            <div className="img-container">
              <img src={image} alt={author} />
            </div>
          </Media.Left>
          <Media.Body>
            <h4>{author}</h4>
            {callToAction ? (
              <p>
                <a href={callToAction.to}>{callToAction.text}</a>
              </p>
            ) : (
              <p>{publication}</p>
            )}
          </Media.Body>
        </Media>
      </div>
    )
  }
}
