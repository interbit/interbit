const fs = require('fs-extra')
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)
const path = require('path')
const {
  constants: { ROOT_CHAIN_ALIAS }
} = require('interbit-covenant-tools')

const { startInterbit } = require('../chainManagement')

// Note: Because interbit-core does not expose it's hashing function (yet) we ned to
// start a cli and deploy the covenants to get a valid hash that is in sync with interbit
// TODO: update this to use the hashing function instead of starting a CLI -- Blocked until core releases hashing algo in API
const packCovenants = async (location, covenantConfig) => {
  const { cli, hypervisor } = await startInterbit()

  const packedCovenants = {}
  const covenants = Object.entries(covenantConfig)
  console.log('PACKING COVENANTS', covenants)
  for (const [covenantAlias, config] of covenants) {
    console.log(`...packing ${covenantAlias} from ${config.location}`)
    const packedCovenant = await packCovenant(cli, location, config.location)

    packedCovenants[covenantAlias] = packedCovenant
  }

  packedCovenants[ROOT_CHAIN_ALIAS] = await packRootCovenant(cli, location)

  // TODO: Kill this thang properly (Blocked: #341)
  console.log('Stopping')
  await cli.shutdown()
  hypervisor.stopHyperBlocker()
  console.log('stopped')

  return packedCovenants
}

const packCovenant = async (cli, location, covenantFileLocation) => {
  const covenantLocation = path.relative(process.cwd(), covenantFileLocation)

  await exec(`npm pack ./${covenantLocation}`)

  // eslint-disable-next-line
  const covenantPackageJson = require(`${covenantFileLocation}/package.json`)
  const packedFilename = `${covenantPackageJson.name}-${
    covenantPackageJson.version
  }.tgz`

  const hash = await cli.deployCovenant(covenantFileLocation)
  await fs.move(packedFilename, `${location}/covenants/${hash}.tgz`)

  return {
    hash,
    filename: `covenants/${hash}.tgz`
  }
}

const packRootCovenant = async (cli, location) => {
  const packageName = 'interbit-covenant-tools'

  const rootCovenantLocation = path.join(
    getPackageDirFromFilePath(packageName, require.resolve(packageName)),
    '/src/rootCovenant'
  )

  const covenantInfo = await packCovenant(cli, location, rootCovenantLocation)

  return covenantInfo
}

const getPackageDirFromFilePath = (packageName, filepath) =>
  filepath.substr(0, filepath.indexOf(packageName) + packageName.length)

module.exports = {
  packCovenants
}
