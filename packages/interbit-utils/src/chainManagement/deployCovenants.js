const deployCovenants = async ({ cli, covenantConfig }) => {
  console.log('DEPLOYING COVENANTS')
  const covenants = Object.keys(covenantConfig)

  const covenantHashes = {}

  for (const covenantName of covenants) {
    const config = covenantConfig[covenantName]

    console.log('DEPLOYING COVENANT:', {
      covenantName,
      location: config.location
    })
    // eslint-disable-next-line no-await-in-loop
    const covenantHash = await cli.deployCovenant(config.location)
    covenantHashes[covenantName] = covenantHash

    console.log('DEPLOYED COVENANT:', {
      covenantName,
      covenantHash
    })
  }

  console.log('DEPLOYED COVENANTS')
  return covenantHashes
}

module.exports = deployCovenants
