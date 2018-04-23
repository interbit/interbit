import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LinkWrapper from './LinkWrapper'

export default class TitledList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        to: PropTypes.string
      })
    ).isRequired
  }

  render() {
    const { title, items } = this.props
    return (
      <div>
        <h4>{title}</h4>
        <ul>
          {items.map(li => (
            <li key={li.text}>
              <LinkWrapper to={li.to}>{li.text}</LinkWrapper>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
