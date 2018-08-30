import assert from 'assert'
import should from 'should'

import covenant from '../../interbit/my-projects'
import { actionTypes, actionCreators } from '../../interbit/my-projects/actions'
import sampleProjects from '../../interbit/my-projects/sampleProjects'
import { actionTypes as projectActionTypes } from '../../interbit/project/actions'

describe('myProjectsChain', () => {
  describe('.reducer(state, action)', () => {
    it('does not modify state on CREATE_PROJECT', () => {
      const projectAlias = 'falcon-heavy'
      const projectName = 'Falcon Heavy'
      const description =
        "US made rocket. The world's first reuseable super heavy rocket. (Flight testing soon, hopefully w/o RUD)"
      const icon = 'fa-mars'
      const action = actionCreators.createProject({
        projectAlias,
        projectName,
        description,
        icon
      })

      const result = covenant.reducer(covenant.initialState, action)

      assert.deepStrictEqual(
        covenant.initialState,
        result.without('sideEffects')
      )
    })

    it('does not modify state on CREATE_SAMPLE_PROJECT', () => {
      const sampleProject = sampleProjects[0]

      const action = actionCreators.createSampleProject({
        sampleProjectName: sampleProject.projectName
      })

      const result = covenant.reducer(covenant.initialState, action)

      assert.deepStrictEqual(
        covenant.initialState,
        result.without('sideEffects')
      )
    })

    it('forwards action on FORWARD_PROJECT_ACTION', () => {
      const projectAlias = 'cats'
      const projectChainId = 'cats001'
      const actionToForward = {
        type: projectActionTypes.UPDATE_PROJECT,
        payload: {
          data: 'meowmeowmeow'
        }
      }

      const state = covenant.initialState
        .setIn(['myProjects', projectAlias], 'meow')
        .setIn(
          ['interbit', 'children', projectAlias, 'blockHash'],
          projectChainId
        )

      const action = actionCreators.forwardActionToProject({
        projectAlias,
        action: actionToForward
      })

      const afterState = covenant.reducer(state, action)
      assert.deepStrictEqual(
        afterState.getIn([
          'interbit',
          'sent-actions',
          projectChainId,
          'pending-actions',
          '0'
        ]),
        actionToForward
      )
    })

    it('throws on FORWARD_PROJECT_ACTION when project chain does not exist', () => {
      const projectAlias = 'cats'
      const actionToForward = {
        type: projectActionTypes.UPDATE_PROJECT,
        payload: {
          projectAlias,
          data: 'meowmeowmeow'
        }
      }

      const action = actionCreators.forwardActionToProject({
        projectAlias,
        action: actionToForward
      })

      should(() => {
        covenant.reducer(covenant.initialState, action)
      }).throw(/Unknown project alias/)
    })
  })

  it('schedules new sample project creation on CREATE_SAMPLE_PROJECT', () => {
    const sampleProject = sampleProjects[0]

    const action = actionCreators.createSampleProject({
      sampleProjectName: sampleProject.projectName
    })

    const afterState = covenant.reducer(covenant.initialState, action)
    const sideEffects = afterState.sideEffects

    assert.strictEqual(sideEffects[0].type, '@@interbit/CREATE_CHILD_CHAIN')
    assert.strictEqual(
      sideEffects[0].payload.childAlias,
      sampleProject.projectAlias
    )

    assert.strictEqual(
      sideEffects[1].type,
      actionTypes.FORWARD_ACTION_TO_PROJECT
    )
    assert.strictEqual(
      sideEffects[1].payload.projectAlias,
      sampleProject.projectAlias
    )
  })

  it('schedules multiple sample project creation on CREATE_SAMPLE_PROJECTS', () => {
    const action = actionCreators.createSampleProjects()

    const afterState = covenant.reducer(covenant.initialState, action)
    const sideEffects = afterState.sideEffects

    assert.strictEqual(sideEffects[0].type, '@@interbit/CREATE_CHILD_CHAIN')
    assert.strictEqual(
      sideEffects[0].payload.childAlias,
      sampleProjects[0].projectAlias
    )

    assert.strictEqual(
      sideEffects[1].type,
      actionTypes.FORWARD_ACTION_TO_PROJECT
    )
    assert.strictEqual(
      sideEffects[1].payload.projectAlias,
      sampleProjects[0].projectAlias
    )

    assert.strictEqual(sideEffects[2].type, '@@interbit/CREATE_CHILD_CHAIN')
    assert.strictEqual(
      sideEffects[2].payload.childAlias,
      sampleProjects[1].projectAlias
    )

    assert.strictEqual(
      sideEffects[3].type,
      actionTypes.FORWARD_ACTION_TO_PROJECT
    )
    assert.strictEqual(
      sideEffects[3].payload.projectAlias,
      sampleProjects[1].projectAlias
    )

    assert.strictEqual(sideEffects[4].type, '@@interbit/CREATE_CHILD_CHAIN')
    assert.strictEqual(
      sideEffects[4].payload.childAlias,
      sampleProjects[2].projectAlias
    )

    assert.strictEqual(
      sideEffects[5].type,
      actionTypes.FORWARD_ACTION_TO_PROJECT
    )
    assert.strictEqual(
      sideEffects[5].payload.projectAlias,
      sampleProjects[2].projectAlias
    )
  })
})
