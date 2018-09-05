const {
  interbitRedux: {
    selectors: { getSponsorConfig }
  }
} = require('interbit-ui-tools')

const myProjects = require('../interbit/my-projects/actions')
const project = require('../interbit/project/actions')

const chainAliases = require('../constants/chainAliases')

const covenantName = myProjects.covenantName

const createActionCreators = state => {
  const sponsorChainConfig = getSponsorConfig(state, {
    publicChainAlias: chainAliases.PUBLIC,
    privateChainAlias: chainAliases.PRIVATE_PROJECT
  })

  return {
    createProject: () => ({
      type: myProjects.actionTypes.CREATE_PROJECT,
      arguments: {
        projectAlias: 'Project alias',
        projectName: 'Project name',
        description: 'Project description in MD format',
        icon: 'font Awesome Icon string'
      },
      invoke: ({ projectAlias, projectName, description, icon }) =>
        myProjects.actionCreators.createProject({
          sponsorChainConfig,
          projectAlias,
          projectName,
          description,
          icon
        })
    }),

    createSampleProject: () => ({
      type: myProjects.actionTypes.CREATE_SAMPLE_PROJECT,
      arguments: { sampleProjectName: 'Sample project name' },
      invoke: ({ sampleProjectName }) =>
        myProjects.actionCreators.createSampleProject({
          sponsorChainConfig,
          sampleProjectName
        })
    }),

    createSampleProjects: () => ({
      type: myProjects.actionTypes.CREATE_SAMPLE_PROJECTS,
      arguments: {},
      invoke: () =>
        myProjects.actionCreators.createSampleProjects({ sponsorChainConfig })
    }),

    updateProject: () => ({
      type: project.actionTypes.UPDATE_PROJECT,
      arguments: {
        projectAlias: 'Project alias',
        projectName: 'Project name',
        description: 'Project description in MD format',
        icon: 'font Awesome Icon string'
      },
      invoke: ({ projectAlias, projectName, description, icon }) =>
        myProjects.actionCreators.forwardActionToProject({
          projectAlias,
          action: project.actionCreators.updateProject({
            projectName,
            description,
            icon
          })
        })
    })
  }
}

module.exports = {
  covenantName,
  createActionCreators
}
