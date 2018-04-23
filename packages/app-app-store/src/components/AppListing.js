import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Panel } from 'react-bootstrap'
import FiveStarRating from './FiveStarRating'
import thumbnails from '../img/thumbnails'

export default class AppListing extends Component {
  static propTypes = {
    app: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.shape({
        name: PropTypes.string,
        chainId: PropTypes.string
      })
    }).isRequired,
    appId: PropTypes.string.isRequired,
    selectApp: PropTypes.func.isRequired
  }

  render() {
    const { app, appId, selectApp } = this.props

    return (
      <Panel
        onClick={() => {
          selectApp(appId)
        }}
        className="App-listing">
        <div className="App-thumbnail">
          <img
            src={thumbnails[app.thumbnail]}
            className="img-responsive"
            alt="app-logo"
          />
        </div>
        <div className="App-description">
          <h4>{app.name}</h4>
          <p className="App-author">{app.author.name}</p>
          <FiveStarRating rating={app.rating} />
          <p className="App-price">
            ${app.price.amt} {app.price.type}
          </p>
        </div>
      </Panel>
    )
  }
}
