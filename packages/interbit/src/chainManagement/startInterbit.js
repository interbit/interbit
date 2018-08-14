const _ = require('lodash')
const {
  createHypervisor,
  createCli
} = require('interbit-core/dist/bundle.server')

// TODO: accept a port var #280
const startInterbit = async (keyPair, options = {}) => {
  const port = _.get(options, ['port']) || 5000
  const dbPath = _.get(options, ['dbPath'])
  const originalDbPath = process.env.DB_PATH

  let cli = { shutdown: () => {} }
  let hypervisor = { stopHyperBlocker: () => {} }
  const cleanup = async () => {
    console.log('SHUTTING-DOWN CLI')
    await cli.shutdown()
    console.log('STOPPING HYPERVISOR')
    hypervisor.stopHyperBlocker()
  }

  try {
    if (dbPath) {
      process.env.DB_PATH = dbPath
    }

    console.log(`STARTING HYPERVISOR: DB_PATH=${process.env.DB_PATH}`)
    hypervisor = keyPair
      ? await createHypervisor({ keyPair })
      : await createHypervisor()

    console.log(`CREATING CLI: PORT=${port}`)
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

  return { hypervisor, cli, cleanup }
}

module.exports = startInterbit
