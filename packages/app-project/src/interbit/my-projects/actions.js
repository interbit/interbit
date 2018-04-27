const {
  validate,
  objectValidationRules: {
    required,
    chainIdPattern,
    faIconPattern,
    string,
    object
  }
} = require('interbit-covenant-tools')

const covenantName = 'app-project_my-projects'

const actionTypes = {
  // Update basic account details about the owner of these projects
  AUTHORIZED: `${covenantName}/AUTHORIZED`,

  // Create a new project
  CREATE_PROJECT: `${covenantName}/CREATE_PROJECT`,

  // Create sample project
  CREATE_SAMPLE_PROJECT: `${covenantName}/CREATE_SAMPLE_PROJECT`,

  // Create missing sample projects
  CREATE_SAMPLE_PROJECTS: `${covenantName}/CREATE_SAMPLE_PROJECTS`,

  // Forward action to project chain
  FORWARD_ACTION_TO_PROJECT: `${covenantName}/FORWARD_ACTION_TO_PROJECT`
}

const actionCreators = {
  // Public actions that can be invoked by clients
  authorized: ({ providerChainId, joinName }) => ({
    type: actionTypes.AUTHORIZED,
    payload: validate(
      { providerChainId, joinName },
      { providerChainId: chainIdPattern(), joinName: required() }
    )
  }),

  createProject: ({ projectAlias, projectName, description, icon }) => ({
    type: actionTypes.CREATE_PROJECT,
    payload: validate(
      { projectAlias, projectName, description, icon },
      {
        projectAlias: required(),
        projectName: required(),
        icon: faIconPattern()
      }
    )
  }),

  createSampleProject: ({ sampleProjectName }) => ({
    type: actionTypes.CREATE_SAMPLE_PROJECT,
    payload: validate({ sampleProjectName }, { sampleProjectName: required() })
  }),

  createSampleProjects: () => ({
    type: actionTypes.CREATE_SAMPLE_PROJECTS,
    payload: {}
  }),

  forwardActionToProject: ({ projectAlias, action }) => ({
    type: actionTypes.FORWARD_ACTION_TO_PROJECT,
    payload: validate(
      {
        projectAlias,
        actionToForward: validate(action, { type: string(), payload: object() })
      },
      { projectAlias: required() }
    )
  })
}

module.exports = {
  actionTypes,
  actionCreators
}
