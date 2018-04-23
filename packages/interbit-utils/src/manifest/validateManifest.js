const {
  getApps,
  getChains,
  getCovenants,
  getGenesisBlocks,
  getGenesisBlockByAlias,
  getBlockMasterByAlias,
  getChainIdByAlias
} = require('../../src/manifest/manifestSelectors')
const {
  validate,
  objectValidationRules: { required, matches, chainIdPattern, equalTo, numeric }
} = require('interbit-validate')

const validateManifest = manifest => {
  validate(manifest, manifestRules)
  validateChains(manifest)
  validateApps(manifest)
  validateCovenants(manifest)
  validateGenesisBlocks(manifest)

  return true
}

const validateChains = manifest => {
  const chains = getChains(manifest)
  if (chains) {
    const chainEntries = Object.entries(chains)
    for (const [chainAlias, chainId] of chainEntries) {
      validate({ chainId }, chainIdRules)
      const genesisBlock = getGenesisBlockByAlias(chainAlias, manifest)
      if (!genesisBlock) {
        throw new Error(`Chain "${chainAlias}" is missing a genesis block`)
      }
    }
  }
}

const validateApps = manifest => {
  const apps = getApps(manifest)
  if (apps) {
    const appEntries = Object.entries(apps)
    for (const [appName, appManifest] of appEntries) {
      const appRulesForAppName = appRules(appName)
      validate(appManifest, appRulesForAppName)
      isResolvedChainId(
        appManifest.appChain,
        manifest,
        `App "${appName}" in manifest uses unresolved appChain "${
          appManifest.appChain
        }"`
      )
    }
  }
}

const validateCovenants = manifest => {
  const covenants = getCovenants(manifest)
  if (covenants) {
    const covenantEntries = Object.entries(covenants)
    for (const [covenantAlias, covenantManifest] of covenantEntries) {
      const covenantRulesForAlias = covenantRules(covenantAlias)
      validate(covenantManifest, covenantRulesForAlias)
    }
  }
}

const validateGenesisBlocks = manifest => {
  const genesisBlocks = getGenesisBlocks(manifest)
  if (genesisBlocks) {
    const genesisBlocksEntries = Object.entries(genesisBlocks)
    for (const [chainAlias, genesisBlock] of genesisBlocksEntries) {
      try {
        validate(genesisBlock, genesisBlockRules)
        validate(genesisBlock.content, genesisBlockContentRules)
        validate(genesisBlock.signatures, genesisBlockSignatureRules)
      } catch (e) {
        throw new Error(`Genesis block for "${chainAlias}" is malformed`)
      }
      const blockMaster = getBlockMasterByAlias(chainAlias, manifest)
      if (!blockMaster) {
        throw new Error(`Genesis block for "${chainAlias}" has no blockMaster`)
      }
    }
  }
}

const isResolvedChainId = (chainAlias, manifest, msg) => {
  const appChainId = getChainIdByAlias(chainAlias, manifest)
  if (!appChainId) {
    throw new Error(msg)
  }
}

const manifestRules = {
  chains: required('Manifest is missing chains prop'),
  manifest: required('Manifest is missing manifest prop'),
  genesisBlocks: required('Manifest is missing genesisBlocks prop')
}

const chainIdRules = {
  chainId: chainIdPattern('Chains in manifest are not real chain IDs')
}

const appRules = appName => ({
  appChain: required(`App "${appName}" in manifest is missing appChain`),
  buildLocation: required(
    `App "${appName}" in manifest is missing buildLocation`
  )
})

const covenantRules = covenantAlias => ({
  hash: required(`Covenant "${covenantAlias}" is missing the hash prop`),
  filename: required(`Covenant "${covenantAlias}" is missing the filename prop`)
})

const genesisBlockSignatureRules = {
  GENESIS: equalTo('GENESIS')
}

const genesisBlockContentRules = {
  previousHash: matches(/^genesis$/),
  stateHash: required(),
  actions: required(),
  errors: required(),
  redispatches: required(),
  height: equalTo(0),
  timestamp: numeric(),
  seed: numeric(),
  configChanged: required(),
  timeToCreateBlock: equalTo(0),
  state: required()
}

const genesisBlockRules = {
  contentHash: required(),
  signatures: required(),
  signaturesHash: required(),
  blockHash: required()
}

module.exports = validateManifest
