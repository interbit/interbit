import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Markdown from '../Markdown'

export default class SidebarList extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired
      })
    ).isRequired
  }

  render() {
    const { title, contents } = this.props

    return (
      <div className="ibweb-sidebar-list">
        <h4>{title}</h4>
        <ul>
          {contents.map(c => (
            <li key={c.text}>
              <Markdown markdown={c.text} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
