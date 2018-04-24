const INTERBUFFER = 'interbit-covenant-tools'
const ROOT = 'root'
const COVENANTS = 'covenants'
const COVENANT_HASH = 'covenantHash'
const CHAINS = 'chains'
const CHAIN_ID = 'chainId'
const MANIFEST = 'manifest'
const MANIFEST_HASH = 'manifestHash'
const ACL = 'acl'

const FILE_LAYER = 'fileLayer'
const FILE_LAYER_DIRECTORY = 'directory'
const FILE_LAYER_CONTENT = 'contentToBeHoistedByCore'
const FILE_LAYER_TEMP_SPACE = 'contentToBeHoistedByCoreTmpSpace'

const PATHS = {
  MANIFEST: [INTERBUFFER, MANIFEST],

  FILE_LAYER: [INTERBUFFER, FILE_LAYER],
  FILE_LAYER_CONTENT: [INTERBUFFER, FILE_LAYER, FILE_LAYER_CONTENT],
  FILE_LAYER_DIRECTORY: [INTERBUFFER, FILE_LAYER, FILE_LAYER_DIRECTORY],
  FILE_LAYER_TEMP_SPACE: [INTERBUFFER, FILE_LAYER, FILE_LAYER_TEMP_SPACE]
}

module.exports = {
  PATHS,
  INTERBUFFER,
  ROOT,
  COVENANTS,
  COVENANT_HASH,
  CHAINS,
  CHAIN_ID,
  MANIFEST,
  MANIFEST_HASH,
  ACL
}
