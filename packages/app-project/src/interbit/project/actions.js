const {
  validate,
  objectValidationRules: { required, faIconPattern }
} = require('interbit-covenant-tools')

const actionTypes = {
  // Update project details
  UPDATE_PROJECT: 'app-project_project/UPDATE_PROJECT'
}

const authorizedRemoteActions = [actionTypes.UPDATE_PROJECT]

const actionCreators = {
  // Update basic account details about the owner of these projects
  updateProject: ({ projectName, description, icon, launchUrl }) => ({
    type: actionTypes.UPDATE_PROJECT,
    payload: validate(
      { projectName, description, icon, launchUrl },
      { projectName: required(), icon: faIconPattern() }
    )
  })
}

module.exports = {
  actionTypes,
  actionCreators,
  authorizedRemoteActions
}
