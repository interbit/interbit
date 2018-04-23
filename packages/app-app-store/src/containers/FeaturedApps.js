import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import LinkBarGetStarted from '../components/LinkBarGetStarted'
import featuredStarting from '../assets/featuredStarting.svg'
import featuredApps from '../assets/featuredApps.svg'

export default class FeaturedApps extends Component {
  render() {
    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    return (
      <Grid className="ibweb-page">
        <Row>
          <Col {...colLayout}>
            <div className="featured-app">
              <h2>The Starting Block</h2>
              <p>
                Have an idea for a blockchain-based business or application? On
                May 1st we’ll be accepting submissions to be part of the
                Starting Block program.
              </p>
              <img src={featuredStarting} alt="The Starting Block" />
            </div>
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <div className="featured-app">
              <h2>Getting featured</h2>
              <p>
                Once you have submitted your app to the Store, our team will
                review and feature apps that showcase innovative uses of the
                Interbit platform of application services.
              </p>
              <p>
                Promotion in the Featured Apps section is chosen entirely by the
                quality of your application or service.
              </p>
              <img src={featuredApps} alt="Featured Apps" />
            </div>
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <LinkBarGetStarted />
          </Col>
        </Row>
      </Grid>
    )
  }
}
