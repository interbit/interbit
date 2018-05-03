// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const path = require('path')
const {
  argOptions: { ADMIN_KEYS },
  getArtifactsLocation,
  getKeyPair,
  getManifest,
  getPort,
  deploy,
  manifestSelectors: { getChains }
} = require('interbit')

const deployWithCliOptions = async () => {
  const options = getOptions()

  console.log(options.location, options.manifest)
  console.log('MANIFEST CHAIN IDs', getChains(options.manifest))

  if (!options.keyPair) {
    console.warn(
      `DEPLOY-WARNING: You are about to launch a node without ${ADMIN_KEYS}. The hypervisor will generate a new pair which may not match your ACL or network configuration.`
    )
  }

  deploy(options)
}

const getOptions = () => ({
  manifest: getManifest(),
  port: getPort(),
  keyPair: getKeyPair(),
  location: path.relative(process.cwd(), getArtifactsLocation())
})

deployWithCliOptions()
