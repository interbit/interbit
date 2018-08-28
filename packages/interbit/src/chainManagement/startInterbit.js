const _ = require('lodash')
const {
  createHypervisor,
  createCli
} = require('interbit-core/dist/bundle.server')

const log = require('../log')

/**
 * Starts an interbit node, returning the cli, hypervisor, and a function
 * to safely cleanup the node.
 * @param {Object} keyPair - The key pair to use to create and authorize this
 *  node in the network.
 * @param {String} keyPair.publicKey - Public key for this key pair.
 * @param {String} keyPair.privateKey - Private key for this key pair.
 * @param {Object} options - The options used to configure and create this node.
 * @param {String|number} options.port - Port for this node to bind to.
 * @param {String} options.dbPath - Filepath to hold this node's database.
 * @returns {{ cli:Object, hypervisor:Object, cleanup:Function }} The cli interface
 *  for the Interbit node, the node's hypervisor, and a function to cleanup the node.
 */
const startInterbit = async (keyPair, options = {}) => {
  const port = _.get(options, ['port']) || 5000
  const dbPath = _.get(options, ['dbPath'])
  const originalDbPath = process.env.DB_PATH

  let cli = { shutdown: () => {} }
  let hypervisor = { stopHyperBlocker: () => {} }
  const cleanup = async () => {
    log.info('SHUTTING-DOWN CLI')
    await cli.shutdown()
    log.info('STOPPING HYPERVISOR')
    hypervisor.stopHyperBlocker()
  }

  try {
    if (dbPath) {
      process.env.DB_PATH = dbPath
    }

    log.info(`STARTING HYPERVISOR: DB_PATH=${process.env.DB_PATH}`)
    hypervisor = keyPair
      ? await createHypervisor({ keyPair })
      : await createHypervisor()

    log.info(`CREATING CLI: PORT=${port}`)
    cli = await createCli(hypervisor)
    await cli.startServer(port)
  } finally {
    if (dbPath) {
      if (originalDbPath) {
        process.env.DB_PATH = originalDbPath
      } else {
        delete process.env.DB_PATH
      }
    }
  }

  log.success('Started interbit node')

  return { hypervisor, cli, cleanup }
}

module.exports = startInterbit
