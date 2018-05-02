import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { selectors } from 'interbit-ui-tools'
import { LinkBar, LinkBarSlack } from 'interbit-ui-components'

import urls from '../constants/urls'
import ProjectItem from '../components/ProjectItem'
import ProjectBar from '../components/ProjectBar'

import { getExploreChainState } from '../redux/exploreChainReducer'
import chairmanmeow from '../assets/chairmanmeow.jpg'

const mapStateToProps = state => {
  const { state: chainState } = getExploreChainState(state)
  if (!chainState) {
    return {
      projects: []
    }
  }

  const projects = chainState.myProjects
    ? Object.entries(chainState.myProjects).map(kvp => ({
        projectAlias: kvp[0],
        name: kvp[1].projectName,
        description: kvp[1].description,
        faIcon: kvp[1].icon,
        launchUrl: kvp[1].launchUrl
      }))
    : []

  const connectUrl = generateConnectUrl(state)

  return {
    projects,
    connectUrl
  }
}

const generateConnectUrl = state => {
  const { state: chainState } = getExploreChainState(state)
  if (!chainState || !chainState.dns) {
    return '#'
  }

  const dnsServices = chainState.dns.interbitServices

  const queryOpts = {
    chainId: selectors.getChainId(state.interbit, 'myProjects'),
    redirectUrl: `${dnsServices.projects.serviceEndpoint}/connect`,
    tokens: ['alias', 'email']
  }
  const query = queryString.stringify(queryOpts)
  const connectUrl = `${dnsServices.accounts.serviceEndpoint}/connect?${query}`

  return connectUrl
}

export class ProjectList extends Component {
  static propTypes = {
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        projectAlias: PropTypes.string.isRequired,
        name: PropTypes.string,
        description: PropTypes.string,
        faIcon: PropTypes.string.isRequired,
        launchUrl: PropTypes.string
      })
    ).isRequired,
    connectUrl: PropTypes.string
  }

  static defaultProps = {
    connectUrl: '#'
  }

  render() {
    const { projects, connectUrl } = this.props
    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    return (
      <Grid>
        <Row>
          <Col sm={12} className="Connect-create">
            <Button className="Secondary-button Connect" href={connectUrl}>
              Connect to Account
            </Button>
            <LinkContainer to="/new-project">
              <Button className="Primary-button Create-new">
                Create New Project
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        {projects.map(project => (
          <ProjectItem
            key={project.projectAlias}
            projectAlias={project.projectAlias}
            name={project.name}
            description={project.description}
            faIcon={project.faIcon}
            launchUrl={project.launchUrl}
          />
        ))}

        <div className="ibweb-page">
          <Row className="ibweb-mg-md">
            <Col {...colLayout}>
              <h1>Projects</h1>
              <div className="ibweb-intro">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="ibweb-mg-xx-lg">
            <Col {...colLayout}>
              <LinkBar
                title="Create a New Project"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                image={chairmanmeow}
                to="/new-project"
                className="dotted"
              />
              <ProjectBar
                name="Project name"
                image={chairmanmeow}
                isDeployed
                launchUrl="#"
              />
              <ProjectBar
                name="Project name"
                image={chairmanmeow}
                isDeployed
                isPassing
                launchUrl="#"
              />
              <ProjectBar
                name="Project name"
                image={chairmanmeow}
                isDeployed={false}
                launchUrl="#"
              />

              {projects.map(project => (
                <ProjectBar
                  key={project.projectAlias}
                  name={project.name}
                  image={chairmanmeow}
                  launchUrl={project.launchUrl}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col {...colLayout}>
              <LinkBarSlack to={urls.SUPPORT_SLACK} />
            </Col>
          </Row>
        </div>
      </Grid>
    )
  }
}

export default connect(mapStateToProps)(ProjectList)
