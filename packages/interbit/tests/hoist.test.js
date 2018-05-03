const assert = require('assert')
const { hoistAllCovenantPackages } = require('../src/scripts/hoist')

describe('hoist interbit covenant dependencies into app', () => {
  describe('hoistAllCovenantPackages(appPackageJson, covenantPackageJsons)', () => {
    it('hoists packages in covenants that do not exist in app', () => {
      const appPackageJson = {
        dependencies: {
          one: '1.0.0',
          two: '2.0.0'
        },
        devDependencies: {
          three: '3.0.0'
        }
      }
      const covenantPackageJsons = [
        {
          name: 'firstCovenant',
          dependencies: {
            four: '4.0.0'
          }
        },
        {
          name: 'secondCovenant',
          devDependencies: {
            five: '5.0.0'
          }
        }
      ]

      const hoistedDependencies = hoistAllCovenantPackages(
        appPackageJson,
        covenantPackageJsons
      )

      assert.equal(hoistedDependencies.dependencies.one, '1.0.0')
      assert.equal(hoistedDependencies.dependencies.two, '2.0.0')
      assert.equal(hoistedDependencies.devDependencies.three, '3.0.0')
      assert.equal(hoistedDependencies.dependencies.four, '4.0.0')
      assert.equal(hoistedDependencies.devDependencies.five, '5.0.0')
    })

    it('does not hoist a package that already exists in the app', () => {
      const appPackageJson = {
        dependencies: {
          one: '1.0.0',
          two: '2.0.0'
        },
        devDependencies: {
          three: '3.0.0'
        }
      }
      const covenantPackageJsons = [
        {
          name: 'covenant',
          dependencies: {
            one: '4.0.0',
            two: '5.0.0'
          },
          devDependencies: {
            three: '6.0.0'
          }
        }
      ]

      const hoistedDependencies = hoistAllCovenantPackages(
        appPackageJson,
        covenantPackageJsons
      )

      assert.equal(Object.keys(hoistedDependencies.dependencies).length, 2)
      assert.equal(Object.keys(hoistedDependencies.devDependencies).length, 1)

      assert.equal(hoistedDependencies.dependencies.one, '1.0.0')
      assert.equal(hoistedDependencies.dependencies.two, '2.0.0')
      assert.equal(hoistedDependencies.devDependencies.three, '3.0.0')
    })

    it('only hoists dependencies if they exist', () => {
      const appPackageJson = {}
      const covenantPackageJsons = [
        {
          name: 'covenant'
        }
      ]

      const hoistedDependencies = hoistAllCovenantPackages(
        appPackageJson,
        covenantPackageJsons
      )

      assert.deepEqual(hoistedDependencies.dependencies, {})
      assert.deepEqual(hoistedDependencies.devDependencies, {})
    })
  })
})
