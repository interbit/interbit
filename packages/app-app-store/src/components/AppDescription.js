import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Button, Panel } from 'react-bootstrap'
import UserCount from './UserCount'
import FiveStarRating from './FiveStarRating'
import AppReview from './AppReview'
import thumbnails from '../img/thumbnails'

export default class AppDescription extends Component {
  static propTypes = {
    app: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      author: PropTypes.shape({
        name: PropTypes.string,
        chainId: PropTypes.string
      })
    }).isRequired
  }

  render() {
    const { app } = this.props

    return (
      <Grid fluid>
        <Row>
          <Col md={12} lg={8}>
            <Panel className="Description-panel">
              <Row className="Description-details">
                <Col xs={5} sm={3} md={3} lg={3}>
                  <img src={thumbnails[app.thumbnail]} alt="app-logo" />
                </Col>
                <Col xs={7} sm={5} md={6} lg={5}>
                  <h3>{app.name}</h3>
                  <div>
                    <div>{app.author.name}</div>
                    <div>E Everyone</div>
                    <div>No in-app purchases</div>
                  </div>
                </Col>
                <Col xs={12} sm={4} md={3} lg={4} className="App-rating">
                  <FiveStarRating rating={app.rating} />
                  <UserCount count={app.users} />
                  <Button className="Primary-button">
                    ${app.price.amt} {app.price.type} BUY
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col md={12}>{/* App Screen shots go here */}</Col>
              </Row>
              <Row className="App-overview">
                <Col md={12}>
                  <h4>Overview</h4>
                  <div>{app.description}</div>
                  <div>
                    Lorem Ipsum is unattractive, both inside and out. I fully
                    understand why its former users left it for something else.
                    They made a good decision. I think my strongest asset maybe
                    by far is my temperament. I have a placeholding temperament.
                    The other thing with Lorem Ipsum is that you have to take
                    out its family. Lorem Ipsum best not make any more threats
                    to your website. It will be met with fire and fury like the
                    world has never seen.
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h4>Reviews</h4>
                  <AppReview
                    rating={app.rating}
                    reviewText="This app is super duper."
                  />
                  <AppReview
                    rating={app.rating}
                    reviewText="I like how this app makes it super eady to understand and pay for my blockchains. I am deducting .3 of a star because I don't like spending money."
                  />
                  <AppReview
                    rating={app.rating}
                    reviewText="Wow how insane my review is exactly 4.7 stars like all the other reviews. this is not odd, don't think about it too much."
                  />
                </Col>
              </Row>
            </Panel>
          </Col>
          <Col lg={4} xsHidden smHidden mdHidden>
            <h3 className="Similar-heading">Similar</h3>
            <Panel className="App-listing">Similar App</Panel>
            <Panel className="App-listing">Similar App</Panel>
            <Panel className="App-listing">Similar App</Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}
