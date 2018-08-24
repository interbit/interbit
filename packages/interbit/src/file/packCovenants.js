const fs = require('fs-extra')
const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)
const path = require('path')
const {
  constants: { ROOT_CHAIN_ALIAS }
} = require('interbit-covenant-tools')

const log = require('../log')
const { startInterbit } = require('../chainManagement')

// Note: Because interbit-core does not expose it's hashing function (yet) we ned to
// start a cli and deploy the covenants to get a valid hash that is in sync with interbit
// TODO: update this to use the hashing function instead of starting a CLI -- Blocked until core releases hashing algo in API
/**
 * Packs the covenants specified in covenantConfig and stores them in the artifacts
 * folder for future deployment to an Interbit node.
 * @param {String} location - file location to work from
 * @param {Object} covenantConfig - Configuration for the covenants to pack.
 *    Typically from an interbit config file.
 * @param {Object} options - Options for packing this covenant
 * @param {Object} options.keyPair - public private key pair (to start the node for packing)
 * @param {Object} options.port - Port for this node to bind to
 * @param {Object} options.dbPath - Filepath to hold this node's database
 * @returns {Object} - A map of the covenant aliases packed to the hash and packed fle location
 */
const packCovenants = async (location, covenantConfig, options = {}) => {
  const { cli, cleanup } = await startInterbit(undefined, options)
  const packedCovenants = {}

  try {
    const covenants = Object.entries(covenantConfig)
    log.info('PACKING COVENANTS', covenants)
    for (const [covenantAlias, config] of covenants) {
      log.info(`...packing ${covenantAlias} from ${config.location}`)
      const packedCovenant = await packCovenant(cli, location, config.location)

      packedCovenants[covenantAlias] = packedCovenant
    }

    packedCovenants[ROOT_CHAIN_ALIAS] = await packRootCovenant(cli, location)
  } finally {
    await cleanup()
  }

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
