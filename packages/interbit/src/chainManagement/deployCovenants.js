const log = require('../log')

/**
 * Deploys a set of covenants defined in config to a chain.
 * These covenant configurations should point to covenant package
 * file locations.
 * @param {Object} params - The params object.
 * @param {Object} params.cli - The cli of the node to deploy the covenants to.
 * @param {Object} params.covenantConfig - Configuration info for the covenants
 *    to deploy, typically out of a config file.
 * @returns {Object} - The covenant hashes mapped to the covenant aliases.
 */
const deployCovenants = async ({ cli, covenantConfig }) => {
  log.info('DEPLOYING COVENANTS')
  const covenants = Object.keys(covenantConfig)

  const covenantHashes = {}

  for (const covenantName of covenants) {
    const config = covenantConfig[covenantName]

    log.info('DEPLOYING COVENANT:', {
      covenantName,
      location: config.location
    })
    // eslint-disable-next-line no-await-in-loop
    const covenantHash = await cli.deployCovenant(config.location)
    covenantHashes[covenantName] = covenantHash

    log.info('DEPLOYED COVENANT:', {
      covenantName,
      covenantHash
    })
  }

  log.success('DEPLOYED COVENANTS')
  return covenantHashes
}

module.exports = deployCovenants
