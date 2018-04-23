// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const Immutable = require('seamless-immutable')
const {
  selectors: interbufferSelectors,
  covenant: { reducer: interbufferReducer }
} = require('interbit-core-buffer')
const {
  createChildChain,
  redispatch,
  remoteRedispatch,
  startConsumeState
} = require('interbit-covenant-utils')

const sampleProjectList = require('./sampleProjects')
const interbitServices = require('./interbitServices')

const { actionTypes, actionCreators } = require('./actions')

const {
  actionCreators: projectActionCreators,
  authorizedRemoteActions
} = require('../project/actions')

const initialState = Immutable.from({
  // Shown in list of running chains
  chainMetadata: { chainName: 'My Projects' },

  // Basic account details for the owner of the chain
  // In future, this will be obtained from the account chain
  ownerProfile: {},

  // Projects owned by this user
  // Populated by read joins from the individual projects
  // Initially populated with sample projects
  myProjects: {},

  // Sample projects
  // TODO: Provide from the public chain
  sampleProjects: sampleProjectList,

  // TODO: Move to the public chain and provide using a read join to the DNS chain
  dns: {
    interbitServices
  }
})

const reducer = (state = initialState, action) => {
  if (action.type.endsWith('STROBE')) {
    return state
  }

  let nextState = interbufferReducer(state, action)
  console.log(action)
  switch (action.type) {
    case actionTypes.AUTHORIZED: {
      console.log('DISPATCH: ', action)
      const { providerChainId, joinName } = action.payload

      const consumeAction = startConsumeState({
        provider: providerChainId,
        mount: ['ownerProfile'],
        joinName
      })

      console.log('REDISPATCH: ', consumeAction)
      nextState = redispatch(nextState, consumeAction)
      return nextState
    }

    case actionTypes.CREATE_PROJECT: {
      console.log('DISPATCH: ', action)
      const {
        projectAlias,
        projectName,
        description,
        icon,
        launchUrl
      } = action.payload

      return createProjectChain(nextState, {
        projectAlias,
        projectName,
        description,
        icon,
        launchUrl
      })
    }

    case actionTypes.CREATE_SAMPLE_PROJECT: {
      console.log('DISPATCH: ', action)
      const { sampleProjectName } = action.payload
      const sampleProjectToCreate = findMatchingSampleProject(
        state,
        sampleProjectName
      )

      if (sampleProjectToCreate) {
        const {
          projectAlias,
          projectName,
          description,
          icon,
          launchUrl
        } = sampleProjectToCreate

        return createProjectChain(nextState, {
          projectAlias,
          projectName,
          description,
          icon,
          launchUrl
        })
      }

      return state
    }

    case actionTypes.CREATE_SAMPLE_PROJECTS: {
      console.log('DISPATCH: ', action)
      const missingSampleProjects = findMissingSampleProjects(state)

      if (missingSampleProjects.length) {
        for (let i = 0; i < missingSampleProjects.length; i += 1) {
          const {
            projectAlias,
            projectName,
            description,
            icon,
            launchUrl
          } = missingSampleProjects[i]

          nextState = createProjectChain(nextState, {
            projectAlias,
            projectName,
            description,
            icon,
            launchUrl
          })
        }
        return nextState
      }

      return state
    }

    case actionTypes.FORWARD_ACTION_TO_PROJECT: {
      console.log('DISPATCH: ', action)

      const { projectAlias, actionToForward } = action.payload

      if (!isValidProjectAction(state, actionToForward)) {
        console.log(`Invalid project action: ${actionToForward}`)
        throw new Error(`Invalid project action: ${actionToForward}`)
      }

      const projectChainId =
        state.getIn(['interbit', 'children', projectAlias, 'blockHash']) ||
        state.getIn(['interbit', 'newChildren', projectAlias, 'blockHash'])

      if (!projectChainId) {
        console.log(`Unknown project alias: ${actionToForward}`)
        throw new Error(`Unknown project alias: ${actionToForward}`)
      }

      console.log('REMOTE DISPATCH: ', projectChainId, actionToForward)
      return remoteRedispatch(state, projectChainId, actionToForward)
    }

    default:
      return nextState
  }
}

const createProjectChain = (
  state,
  { projectAlias, projectName, description, icon, launchUrl }
) => {
  let nextState = state

  console.log('CREATING PROJECT CHAIN: ', { interbufferSelectors })
  const covenantHash = interbufferSelectors.getCovenantHash(
    state,
    'app-project_project'
  )
  console.log({ covenantHash })

  const createChildChainAction = createProjectChainAction({
    covenantHash,
    projectAlias
  })

  console.log('REDISPATCH: ', createChildChainAction)
  nextState = redispatch(state, createChildChainAction)

  const updateChildChainAction = projectActionCreators.updateProject({
    projectName,
    description,
    icon,
    launchUrl
  })
  const forwardAction = actionCreators.forwardActionToProject({
    projectAlias,
    action: updateChildChainAction
  })

  console.log('REDISPATCH: ', forwardAction)
  nextState = redispatch(nextState, forwardAction)

  return nextState
}

const createProjectChainAction = ({ projectAlias, covenantHash }) => {
  const directoryJoinName = `Directory-${projectAlias}`

  return createChildChain({
    childAlias: projectAlias,
    parentShareConfig: {
      provide: [],
      consume: [
        {
          alias: projectAlias,
          path: ['myProjects', projectAlias],
          joinName: directoryJoinName
        }
      ],
      sendActionTo: [{ alias: projectAlias }],
      receiveActionFrom: []
    },
    childShareConfig: {
      provide: [
        {
          alias: 'parent',
          path: ['directoryEntry'],
          joinName: directoryJoinName
        }
      ],
      consume: [],
      sendActionTo: [],
      receiveActionFrom: [
        {
          alias: 'parent',
          authorizedActions: authorizedRemoteActions
        }
      ]
    },
    childCovenantHash: covenantHash
  })
}

const isValidProjectAction = (state, action) =>
  action &&
  action.type &&
  action.payload &&
  authorizedRemoteActions.indexOf(action.type) > -1

const findMatchingSampleProject = (state, sampleProjectName) =>
  state.sampleProjects.find(
    sampleProject => sampleProject.projectName === sampleProjectName
  )

const findMatchingProject = (state, projectName) =>
  Object.values(state.myProjects).find(
    project => project.projectName === projectName
  )

const findMissingSampleProjects = state =>
  state.sampleProjects.filter(
    sampleProject => !findMatchingProject(state, sampleProject.projectName)
  )

module.exports = {
  actionCreators,
  initialState,
  reducer
}
