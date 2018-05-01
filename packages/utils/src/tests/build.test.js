const fs = require('fs')
const glob = require('glob')
const assert = require('assert')

describe('The Build Must Not be Tampered With: It', () => {
  it('has maintained the standard package layout', () => {
    const packagesPath = '../*/'

    let folders, appNames
    try {
      folders = glob.sync(packagesPath)
      const packagePaths = folders.map(pkg => glob.sync(`${pkg}/package.json`))
      const packageJsons = packagePaths.map(([json]) => json)
      // eslint-disable-next-line
      const loaded = packageJsons.map(path => require(`../../${path}`))
      appNames = loaded.map(json => json.name)
    } catch (e) {
      throw new Error(
        "Fundamental error with package layout: missing package.json\nCheck for folders with node-modules and .gitignore'd files from deleted packages."
      )
    }

    folders.forEach((path, index) => {
      const [, name] = path.split('/')

      // check the names match a format
      switch (name) {
        case 'interbit':
        case 'platform-deploy':
        case 'interbit-ui-components':
        case 'template':
        case 'utils':
        case 'web-auth-endpoint':
          break

        default: {
          const defaultMessage = `App name does not match standard app-* and is not in allowed exclusions whitelist: ${name}`
          assert(name.match(/^(app|interbit)(-[a-z]+)+$/), defaultMessage)
        }
      }

      // Check the folder name in package.json matches the folder name allowing for @btlgroup prefix
      const message = `package.json name does not match folder name: ${name}`
      const prefix = '@btlgroup/'
      const appName = appNames[index].startsWith(prefix)
        ? appNames[index].substr(prefix.length)
        : appNames[index]
      assert.equal(name, appName, message)
    })
  })

  it('does not have a modified lerna.json', () => {
    // eslint-disable-next-line
    const lernaPolice = require('../../../../lerna.json')
    // eslint-disable-next-line
    const lernaStandard = require('../standards/std.lerna.json')

    assert.equal(
      JSON.stringify(lernaPolice),
      JSON.stringify(lernaStandard),
      'lerna.json has been modified.'
    )
  })

  it('does not have a modified package.json', () => {
    // eslint-disable-next-line
    const packageJsonPolice = require('../../../../package.json')
    // eslint-disable-next-line
    const jsonStandard = require('../standards/std.package.json')

    assert.equal(
      JSON.stringify(packageJsonPolice),
      JSON.stringify(jsonStandard),
      'package.json has been modified.'
    )
  })

  it('does not have a modified wallaby.conf.js', () => {
    const wallabyConf = fs.readFileSync('../../wallaby.conf.js')
    const wallabyPolice = fs.readFileSync('src/standards/std.wallaby.conf.js')

    assert.equal(
      wallabyConf.toString(),
      wallabyPolice.toString(),
      'wallaby.conf.js has been modified'
    )
  })

  it.skip('does not have discrepancies within the app and template files', () => {
    const templatePaths =
      '../template/{src/redux/chainReducer.js,src/services/blockchain.js,public/!(manifest.json)*,src/!(App|exports)*.*(js|svg)}'
    const templateFileNames = glob.sync(templatePaths)

    const packagesPaths = '../app-*'
    const packageFileNames = glob.sync(packagesPaths)

    packageFileNames.forEach(packageFileName => {
      const packageName = packageFileName.slice(packageFileName.search(/app-*/))

      if (packageName.indexOf('test') > -1) {
        return
      }

      templateFileNames.forEach(templateFileName => {
        const newFileName = templateFileName.replace('template', packageName)
        const templateFile = fs.readFileSync(templateFileName)
        const compareFile = fs.readFileSync(newFileName)

        const message = `File ${templateFileName} in ${packageName}does not match template file.`
        assert.equal(templateFile.toString(), compareFile.toString(), message)
      })
    })
  })

  it('does not allow package-lock.json files to be added to github', () => {
    const gitIgnore = fs.readFileSync('../../.gitignore')
    // eslint-disable-next-line
    assert.ok(gitIgnore.toString().match(/package\-lock\.json/))
  })
})
