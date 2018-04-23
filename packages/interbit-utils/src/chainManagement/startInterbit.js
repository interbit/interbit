const _ = require('lodash')
const {
  createHypervisor,
  createCli
} = require('interbit-core/dist/bundle.server')

// TODO: accept a port var #280
const startInterbit = async (keyPair, options) => {
  const port = _.get(options, ['port']) || 5000

  console.log('STARTING HYPERVISOR')
  const hypervisor = keyPair
    ? await createHypervisor({ keyPair })
    : await createHypervisor()

  console.log('CREATING CLI')
  const cli = await createCli(hypervisor)
  await cli.startServer(port)

  return { hypervisor, cli }
}

module.exports = startInterbit
