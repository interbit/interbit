// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const {
  createChains: { createChainsFromConfig },
  generateDeploymentDetails,
  startInterbit,
  setRootChainManifest
} = require('../chainManagement')
const { updateIndexHtmls, watchCovenants } = require('../file')
const {
  config: { validateConfig }
} = require('interbit-covenant-tools')

const log = require('../log')

/**
 * Starts an interbit node with chains based on the provided options.
 * @param {Object} options - The Interbit node start options.
 * @param {Object} options.config - Interbit configuration for the node.
 * @param {boolean} options.dev - Whether to run in dev mode and watch covenant files for changes.
 * @param {boolean} options.noWatch - Option to override covenant watch if in dev mode.
 */
const start = async options => {
  const { config, dev, noWatch } = options

  validateConfig(config)

  // TODO: Use options.manifest as initial variable resolution for generating the new one #262

  const { cli, hypervisor, cleanup } = await startInterbit(undefined, options)
  // TODO: This create based on config should only run in dev mode, else run chains based on manifest #276
  const { chainManifest, covenantHashes } = await createChainsFromConfig(
    cli,
    config
  )

  // TODO: This manifest mock is no longer required
  const deploymentDetails = generateDeploymentDetails(
    chainManifest,
    covenantHashes
  )

  log.info('available chains + covenants: ', deploymentDetails)

  setRootChainManifest(cli, deploymentDetails, config)

  if (dev && !noWatch) {
    watchCovenants(cli, config, chainManifest)
  }

  if (!dev) {
    // TODO: We are not in dev mode so output the diff'd manifest

    // TODO: Use the manifest to update index.html instead of "deploymentDetails"
    updateIndexHtmls({
      config, // manifest here
      chains: deploymentDetails.chains
    })
  } else {
    updateIndexHtmls({
      config,
      chains: deploymentDetails.chains
    })
  }

  // TODO: Watch the chains for manifest changes #267
  // Blocked by #258 #336
  // watchChain(cli, chainInterface)

  log.success('Interbit node started')

  return { cli, hypervisor, cleanup, chainManifest }
}

module.exports = start
