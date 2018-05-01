import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import {
  ContentBar,
  Divider,
  IconButton,
  Markdown
} from 'interbit-ui-components'

import appDetails from '../content/appDetails'
import appBars from '../content/appBars'
import NotFoundPage from './NotFoundPage'

const mapStateToProps = (state, ownProps) => {
  const urlParamAppName = ownProps.match.params.appName

  const app = {
    appInfo: appDetails[urlParamAppName]
  }

  return app
}

export class AppDetails extends Component {
  static propTypes = {
    appInfo: PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
      appUrl: PropTypes.string,
      companyName: PropTypes.string,
      companyUrl: PropTypes.string,
      category: PropTypes.string,
      rating: PropTypes.string,
      ratingName: PropTypes.string,
      pricing: PropTypes.string,
      button: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string
    }).isRequired
  }

  render() {
    const { appInfo } = this.props
    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    if (!appInfo) {
      return <NotFoundPage />
    }

    return (
      <Grid className="ibweb-page app-details">
        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <div className="ibweb-breadcrumb">
              Apps <i className="fa fa-angle-right" /> {appInfo.name}
            </div>

            <div className="icon-row">
              <img
                src={appInfo.icon}
                alt={appInfo.name}
                style={{ maxWidth: '300px' }}
              />
              <div className="info">
                <h3>{appInfo.name}</h3>
                <p>
                  <a href={appInfo.companyUrl} target="_blank">
                    {appInfo.companyName}
                  </a>
                  {appInfo.category}
                </p>
                <p className="rating">
                  <span>{appInfo.rating}</span> {appInfo.ratingName}
                </p>
                <p>{appInfo.pricing}</p>
              </div>
              <IconButton text={appInfo.button} to={appInfo.appUrl} />
            </div>

            <img
              className="ibweb-image-full-width"
              alt={appInfo.name}
              src={appInfo.image}
            />

            <Markdown markdown={appInfo.description} />

            {appInfo.integratedApps && (
              <div>
                <Divider />
                <h3>Integrated Apps</h3>
                {appInfo.integratedApps.map(a => (
                  <ContentBar
                    key={appBars[a].barTitle}
                    title={appBars[a].barTitle}
                    titleTo={appBars[a].barTitleTo}
                    image={appBars[a].barImage}
                    className="image-sm">
                    <p>{appBars[a].barP}</p>
                    <Divider />
                    <IconButton
                      text={appBars[a].buttonText}
                      to={appBars[a].buttonTo}
                    />
                  </ContentBar>
                ))}
              </div>
            )}

            <Divider />
            <div className="reviews">
              <h3>Reviews</h3>
              <div className="stars">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
              <p>Coming soon.</p>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(AppDetails)
