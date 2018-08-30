const assert = require('assert')
const {
  selectors: { getParentByChainAlias }
} = require('../../config')

describe('configSelectors', () => {
  it('gets the parent of a configured chain', () => {
    const config = {
      staticChains: {
        hub: {
          covenant: 'one',
          childChains: ['spoke']
        },
        spoke: {
          covenant: 'one',
          childChains: ['superspoke']
        },
        superspoke: {
          covenant: 'one'
        }
      },
      covenants: {
        one: {
          location: 'covenantDir'
        }
      }
    }

    const actualParent = getParentByChainAlias('superspoke', config)
    const expectedParent = 'spoke'

    assert.strictEqual(actualParent, expectedParent)
  })
})
