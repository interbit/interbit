const assert = require('assert')
const { hoistAllCovenantPackages } = require('../../scripts/hoist')

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

      assert.strictEqual(hoistedDependencies.dependencies.one, '1.0.0')
      assert.strictEqual(hoistedDependencies.dependencies.two, '2.0.0')
      assert.strictEqual(hoistedDependencies.devDependencies.three, '3.0.0')
      assert.strictEqual(hoistedDependencies.dependencies.four, '4.0.0')
      assert.strictEqual(hoistedDependencies.devDependencies.five, '5.0.0')
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

      assert.strictEqual(
        Object.keys(hoistedDependencies.dependencies).length,
        2
      )
      assert.strictEqual(
        Object.keys(hoistedDependencies.devDependencies).length,
        1
      )

      assert.strictEqual(hoistedDependencies.dependencies.one, '1.0.0')
      assert.strictEqual(hoistedDependencies.dependencies.two, '2.0.0')
      assert.strictEqual(hoistedDependencies.devDependencies.three, '3.0.0')
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

      assert.deepStrictEqual(hoistedDependencies.dependencies, {})
      assert.deepStrictEqual(hoistedDependencies.devDependencies, {})
    })
  })
})
