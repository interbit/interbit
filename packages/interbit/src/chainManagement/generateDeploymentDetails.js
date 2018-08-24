const log = require('../log')

/**
 * Generates deployment details from a map of deployed chains and
 * covenants that mimics the standard Interbit manifest. Used in the
 * start script to setManifest
 * Set for deprecation (#263)
 * @param {Object} chainManifest - map of chain aliases to chain ids
 * @param {Object} covenants - map of covenant aliases to covenant hashes
 * @returns {Object} - Details of node deployment
 */
const generateDeploymentDetails = (chainManifest, covenants) => {
  log.info({ chainManifest, covenants })
  return {
    chains: Object.entries(chainManifest).reduce(
      (chains, [alias, chainData]) => ({
        ...chains,
        [alias]: chainData.chainId
      }),
      {}
    ),
    covenants
  }
}

module.exports = generateDeploymentDetails
