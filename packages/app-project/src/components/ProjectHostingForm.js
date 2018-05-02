import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Checkbox, FormControl } from 'react-bootstrap'
import { Divider, IconButton } from 'interbit-ui-components'

import { toggleModal } from '../redux/uiReducer'
import modalNames from '../constants/modalNames'
import ModalDeleteProject from '../components/ModalDeleteProject'
import ModalResetProject from '../components/ModalResetProject'
import chairmanmeow from '../assets/chairmanmeow.jpg'

const mapStateToProps = (state, ownProps) => {
  const isDeleteProjectModalVisible =
    state.ui.modals[modalNames.DELETE_PROJECT_MODAL_NAME]
  const isResetProjectModalVisible =
    state.ui.modals[modalNames.RESET_PROJECT_MODAL_NAME]

  return {
    isDeleteProjectModalVisible,
    isResetProjectModalVisible
  }
}

const mapDispatchToProps = dispatch => ({
  toggleModalFunction: modalName => dispatch(toggleModal(modalName))
})

export class ProjectHostingForm extends Component {
  static propTypes = {
    isDeleteProjectModalVisible: PropTypes.bool,
    isResetProjectModalVisible: PropTypes.bool,
    toggleModalFunction: PropTypes.func.isRequired
  }

  static defaultProps = {
    isDeleteProjectModalVisible: false,
    isResetProjectModalVisible: false
  }

  render() {
    const {
      isDeleteProjectModalVisible,
      isResetProjectModalVisible,
      toggleModalFunction
    } = this.props

    return (
      <div>
        <Divider />
        <div className="ibweb-mg-md">
          <h3>Hosting</h3>
          <p>
            Explanatory text. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eius tempor incididunt ut labore et dolore magna
            aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eius tempor incididunt.
          </p>
        </div>

        <div className="ibweb-mg-md">
          <h4 className="app-status">
            App Status <span>Updated 32 minutes ago</span>
          </h4>
          <span className="status pass">
            <i className="fa fa-check-circle" />
            Build Passing
          </span>
          <span className="status fail">
            <i className="fa fa-times-circle" />
            Build Failing
          </span>
          <a href="#" className="app-url">
            <i className="fa fa-external-link" />
            Open App in Browser
          </a>
          <Checkbox disabled>Not Deployed</Checkbox>
        </div>

        <div className="ibweb-mg-sm">
          <h4>Project URL</h4>
          <FormControl type="text" placeholder="http://projecturl.com" />
        </div>

        <div className="ibweb-mg-sm">
          <h4>Manual Deploy</h4>
          <p>
            This will deploy the current state of the branch you specified for
            this project.
          </p>
          <IconButton text="Deploy" to="#" />
        </div>

        <div className="ibweb-mg-sm">
          <h4>Reset Project/Chain</h4>
          <p>
            Resetting this project will wipe the data. This action cannot be
            undone. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <IconButton
            text="Reset"
            onClick={() => {
              toggleModalFunction(modalNames.RESET_PROJECT_MODAL_NAME)
            }}
            className="destructive"
          />
        </div>
        <div>
          <h4>Delete this Project</h4>
          <p>
            Deleting a project will also delete all data and associated chains.
            This action cannot be undone.
          </p>
          <IconButton
            text="Delete Project"
            onClick={() => {
              toggleModalFunction(modalNames.DELETE_PROJECT_MODAL_NAME)
            }}
            className="super-destructive"
          />
        </div>

        <ModalDeleteProject
          image={chairmanmeow}
          show={isDeleteProjectModalVisible}
          toggleModal={toggleModalFunction}
        />
        <ModalResetProject
          image={chairmanmeow}
          show={isResetProjectModalVisible}
          toggleModal={toggleModalFunction}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectHostingForm)
