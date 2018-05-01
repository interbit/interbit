import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { SubmissionError } from 'redux-form'
import PropTypes from 'prop-types'
import { chainDispatch } from 'interbit-ui-tools'
import { LinkBarSlack } from 'interbit-ui-components'

import ProjectDetailsForm from '../components/ProjectDetailsForm'
import { actionCreators } from '../interbit/my-projects/actions'
import { getExploreChainState } from '../redux/exploreChainReducer'
import urls from '../constants/urls'
import chairmanmeow from '../assets/chairmanmeow.jpg'

const mapStateToProps = state => {
  const { blocks } = getExploreChainState(state)
  const blockHeight =
    blocks && blocks.length > 0 ? blocks[blocks.length - 1].content.height : 0
  const newProjectAlias = `User-Project-${blockHeight}`
  return {
    newProjectAlias
  }
}

const mapDispatchToProps = dispatch => ({
  blockchainDispatch: action => dispatch(chainDispatch('myProjects', action))
})

export class NewProject extends Component {
  static propTypes = {
    blockchainDispatch: PropTypes.func.isRequired,
    newProjectAlias: PropTypes.string.isRequired
  }

  submit = formValues => {
    try {
      const { blockchainDispatch, newProjectAlias } = this.props

      const action = actionCreators.createProject({
        ...formValues,
        projectAlias: newProjectAlias,
        projectName: formValues.name,
        icon: formValues.faIcon
      })

      console.log(`dispatching action: ${JSON.stringify(action)}`)
      blockchainDispatch(action)
    } catch (error) {
      console.log(error)
      throw new SubmissionError({
        _error: error.message
      })
    }
  }

  render() {
    const colLayout = {
      md: 8,
      mdOffset: 2
    }

    return (
      <Grid className="ibweb-page">
        <Row className="ibweb-mg-md">
          <Col {...colLayout}>
            <h1>Create a New Project</h1>
            <div className="ibweb-intro">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="ibweb-mg-xx-lg">
          <Col {...colLayout}>
            <img
              src={chairmanmeow}
              alt="App Icon"
              className="app-project-icon"
            />
            <div className="app-project-details">
              <ProjectDetailsForm form="new" onSubmit={this.submit} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col {...colLayout}>
            <LinkBarSlack to={urls.SUPPORT_SLACK} />
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject)
