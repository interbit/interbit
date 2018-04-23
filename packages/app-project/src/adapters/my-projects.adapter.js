const myProjects = require('../interbit/my-projects/actions')
const project = require('../interbit/project/actions')

const covenantName = myProjects.covenantName

const actionCreators = {
  createProject: () => ({
    type: myProjects.actionTypes.CREATE_PROJECT,
    arguments: {
      projectAlias: 'Project alias',
      projectName: 'Project name',
      description: 'Project description in MD format',
      icon: 'font Awesome Icon string'
    },
    invoke: myProjects.actionCreators.createProject
  }),

  createSampleProject: () => ({
    type: myProjects.actionTypes.CREATE_SAMPLE_PROJECT,
    arguments: { sampleProjectName: 'Sample project name' },
    invoke: myProjects.actionCreators.createSampleProject
  }),

  createSampleProjects: () => ({
    type: myProjects.actionTypes.CREATE_SAMPLE_PROJECTS,
    arguments: {},
    invoke: myProjects.actionCreators.createSampleProjects
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

module.exports = {
  covenantName,
  actionCreators
}
