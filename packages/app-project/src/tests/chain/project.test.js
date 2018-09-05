import assert from 'assert'
import covenant from '../../interbit/project'

describe('projectChain/covenant', () => {
  it('updates project on UPDATE_PROJECT', () => {
    const projectName = 'Soyuz-2'
    const description =
      'Russian made rocket currently in use bringing astronauts to and from the ISS.'
    const icon = 'fa-space-shuttle'
    const launchUrl = '#'

    const expected = {
      projectName,
      description,
      icon,
      launchUrl
    }

    const action = covenant.actionCreators.updateProject({
      projectName,
      description,
      icon,
      launchUrl
    })

    const result = covenant.reducer(covenant.initialState, action)

    assert.deepStrictEqual(result.directoryEntry, expected)
  })
})
