const assert = require('assert')
const generateProdConfig = require('../../chainManagement/generateDeploymentDetails')

describe('generateProdConfig(chainManifest, covenantHashes)', () => {
  it('transforms the manifest into the prod configuration', () => {
    const chainManifest = {
      template: {
        covenantHash:
          '9a4b49603e222a9955b9c032c905e0aa525a4f2ab4314c8d275e08cd4a2f6350',
        chainId:
          'fc461eb70e9512c35b7c6466084234ad64c04217aa656b6d5c509b3914a1f017'
      }
    }

    const covenantHashes = {
      template:
        '9a4b49603e222a9955b9c032c905e0aa525a4f2ab4314c8d275e08cd4a2f6350'
    }

    const prodConfig = generateProdConfig(chainManifest, covenantHashes)

    assert.equal(prodConfig.chains.template, chainManifest.template.chainId)
    assert.equal(prodConfig.covenants.template, covenantHashes.template)
  })
})
