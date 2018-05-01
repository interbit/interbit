import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { ContentBar, Divider, IconButton } from 'interbit-ui-components'

import appBars from '../content/appBars'
import contentBars from '../content/contentBars'
import LinkBarGetStarted from '../components/LinkBarGetStarted'
import appListHeader from '../assets/appListHeader.jpg'

export default class AppDirectory extends Component {
  render() {
    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    return (
      <Grid className="ibweb-page">
        <Row>
          <Col md={12}>
            <div className="image-with-text">
              <img
                src={appListHeader}
                alt="App Directory"
                className="ibweb-image-full-width"
              />
              <div className="text">
                <h2>Store</h2>
                <p>
                  Store is an application marketplace and digital distribution
                  platform where Interbit-powered apps are promoted, bought, and
                  sold.
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <h1>Apps</h1>
            {Object.keys(appBars).map(b => (
              <ContentBar
                key={appBars[b].barTitle}
                title={appBars[b].barTitle}
                titleTo={appBars[b].barTitleTo}
                image={appBars[b].barImage}
                className="image-sm">
                <p>{appBars[b].barP}</p>
                <Divider />
                <IconButton
                  text={appBars[b].buttonText}
                  to={appBars[b].buttonTo}
                />
              </ContentBar>
            ))}
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            {Object.keys(contentBars).map(b => (
              <ContentBar
                key={contentBars[b].title}
                title={contentBars[b].title}
                image={contentBars[b].image}
                className="image-sm in-progress store-listing">
                <p>{contentBars[b].content}</p>
              </ContentBar>
            ))}
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
