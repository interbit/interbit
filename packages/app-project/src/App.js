import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { HeaderApp, Footer } from 'lib-react-interbit'
import { Switch, Route } from 'react-router-dom'

import ProjectList from './containers/ProjectList'
import ProjectDetails from './containers/ProjectDetails'
import NewProject from './containers/NewProject'
import NotFoundPage from './containers/NotFoundPage'
import InteractiveChains from './containers/InteractiveChains'
import ExploreChain from './containers/ExploreChain'
import ChainConnect from './containers/ChainConnect'

import profilePic from './img/profilePic.png'
import urls from './constants/urls'
import './css/App.css'

export default class App extends Component {
  render() {
    const userProfile = (
      <div className="Logged-in-user">
        <img className="Profile-pic" src={profilePic} alt="profile" />
        <span>JohnSmith</span>
      </div>
    )

    const footerNav = [
      {
        title: 'Projects',
        items: [
          {
            text: 'Developers',
            to: '#'
          },
          {
            text: 'Documentation',
            to: '#'
          },
          {
            text: 'Support',
            to: '#'
          }
        ]
      },
      {
        title: 'Services',
        items: [
          {
            text: 'Accounts',
            to: '#'
          },
          {
            text: 'App Directory',
            to: '#'
          },
          {
            text: 'Hosting / Projects',
            to: '#'
          }
        ]
      }
    ]

    const footerBottomLinks = [
      {
        text: 'Privacy Policy',
        to: urls.APP_IB_IO_POLICY_PRIVACY
      },
      {
        text: 'Terms of Use',
        to: urls.APP_IB_IO_POLICY_TOS
      }
    ]

    return (
      <div className="App ibweb app-project">
        <div className="ibweb-navbar-container">
          <Grid>
            <Row>
              <Col lg={10} md={9} sm={12}>
                <HeaderApp
                  userAlias={userProfile}
                  navItems={[
                    {
                      title: 'My Projects',
                      eventKey: 'projects'
                    },
                    {
                      title: 'Interactive Chains',
                      eventKey: 'chains',
                      isHidden: process.env.NODE_ENV !== 'development'
                    },
                    {
                      title: 'Block Explorer',
                      eventKey: 'explore'
                    },
                    {
                      title: 'Marketplace',
                      eventKey: 'marketplace'
                    }
                  ]}
                />
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid>
          <Switch>
            <Route exact path="/" component={ProjectList} />
            <Route exact path="/new-project" component={NewProject} />
            <Route exact path="/connect" component={ChainConnect} />
            <Route exact path="/projects" component={ProjectList} />
            <Route exact path="/chains" component={InteractiveChains} />
            <Route path="/explore" component={ExploreChain} />
            <Route path="/projects/:projectAlias" component={ProjectDetails} />
            <Route component={NotFoundPage} />
          </Switch>

          <Footer
            sections={footerNav}
            isInline
            logoUrl={urls.APP_IB_IO}
            bottomLinks={footerBottomLinks}
          />
        </Grid>
      </div>
    )
  }
}
