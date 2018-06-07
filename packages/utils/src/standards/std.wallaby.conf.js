const path = require('path')

module.exports = function (wallaby) {
  // Babel, jest-cli and some other modules may be located under
  // react-scripts/node_modules, so need to let node.js know about it
  process.env.NODE_PATH +=
    path.delimiter +
    path.join(__dirname, 'node_modules') +
    path.delimiter +
    path.join(__dirname, 'node_modules/react-scripts/node_modules')
  require('module').Module._initPaths()

  return {
    files: [
      'packages/**/src/**/*.+(js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!packages/**/src/**/*.test.js?(x)',
      '!packages/utils/**', // This is a test-only package
      '!packages/**/node_modules/**',
      '!vendor/**/node_modules/**'
    ],

    tests: [
      'packages/**/src/**/*.test.js?(x)',
      '!packages/utils/**/*.test.js', // Wallaby doesn't reference monorepo paths correctly
      '!packages/**/src/chain/**',
      '!packages/**/node_modules/**'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app']
      })
    },

    setup: w => {
      const path2 = require('path')
      const jestConfig = require('react-scripts/scripts/utils/createJestConfig')(
        p => require.resolve(`react-scripts/${p}`)
      )
      console.log('projectCacheDir: ', w.projectCacheDir)

      jestConfig.moduleNameMapper = {
        ...jestConfig.moduleNameMapper,
        '^@btlgroup/(.+)': `${w.projectCacheDir}${path2.sep}vendor${
          path2.sep
          }mock${path2.sep}$1`
      }
      Object.keys(jestConfig.transform || {}).forEach(
        k => ~k.indexOf('^.+\\.(js|jsx') && void delete jestConfig.transform[k]
      )
      delete jestConfig.testEnvironment
      console.log('jestConfig: ', jestConfig)
      w.testFramework.configure(jestConfig)
    },

    testFramework: 'jest'
  }
}
