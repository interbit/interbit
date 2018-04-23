import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col } from 'react-bootstrap'
import AppListing from './AppListing'

export default class AppsList extends Component {
  static propTypes = {
    apps: PropTypes.shape({
      key: PropTypes.shape({
        app: PropTypes.shape({
          name: PropTypes.string,
          description: PropTypes.string,
          author: PropTypes.shape({
            name: PropTypes.string,
            chainId: PropTypes.string
          })
        })
      })
    }),
    selectApp: PropTypes.func.isRequired
  }

  static defaultProps = {
    apps: {}
  }

  render() {
    const { apps, selectApp } = this.props
    return (
      <Grid fluid>
        <Row>
          <Col md={9} className="Apps-list-heading">
            <h1>Recommended for you</h1>
            <a href="/" className="See-more">
              See more...
            </a>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="App-container">
              {Object.entries(apps).map(app => (
                <AppListing
                  key={app[0]}
                  selectApp={selectApp}
                  appId={app[0]}
                  app={app[1]}
                />
              ))}
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={9} className="Apps-list-heading">
            <h1>New + Updated Apps</h1>
            <a href="/" className="See-more">
              See more...
            </a>
          </Col>
          <Col md={12}>
            <div className="App-container">
              {Object.entries(apps).map(app => (
                <AppListing
                  key={app[0]}
                  selectApp={selectApp}
                  appId={app[0]}
                  app={app[1]}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}
