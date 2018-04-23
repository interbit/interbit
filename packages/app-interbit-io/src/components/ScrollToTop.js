import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.element,
    location: PropTypes.shape({}).isRequired
  }

  static defaultProps = {
    children: <div />
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { children } = this.props
    return children
  }
}

export default withRouter(ScrollToTop)
