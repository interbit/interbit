const {
  build,
  getArtifactsLocation,
  getConfig,
  getConfigLocation,
  getManifest
} = require('interbit')

const run = async () => {
  const options = {
    config: getConfig(),
    manifest: getManifest(),
    artifacts: getArtifactsLocation()
  }

  if (!options.config) {
    const configLocation = getConfigLocation()
    console.error(
      `interbit build: Could not find config file at ${configLocation}. Create a config file or provide a valid --config option.`
    )
    process.exit(1)
  }

  if (!options.manifest) {
    console.warn(
      `interbit build: Could not find manifest file. Generating a new manifest.`
    )
  }

  try {
    await build(options)
  } catch (e) {
    console.error(`interbit build: ERROR ${e}`)
    process.exit(1)
  }
}

run()
