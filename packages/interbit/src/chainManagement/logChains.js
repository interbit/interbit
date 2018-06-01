const { loggingFactory } = require('../logging/logging-factory')

const {
  getRootChildren,
  getChainIdByAlias
} = require('../manifest/manifestSelectors')

export const logChainsFromManifest = async ({ cli, manifest, logging }) => {
  const childChains = getRootChildren(manifest)

  for (const chainAlias of Object.keys(childChains)) {
    const chainId = getChainIdByAlias(chainAlias, manifest)
    await logChain({ cli, chainAlias, chainId })
  }
}

const logChain = async ({ cli, chainAlias, chainId, format = 'console' }) => {
  const chainInterface = cli.getChain(chainId)
  const logger = loggingFactory({
    format,
    group: 'interbit-logging',
    name: chainAlias
  })
  await logger.connect()

  chainInterface.subscribe(() => {
    const appState = chainInterface.getState()
    const blocks = appState.interbit.blocks
    const content = blocks[blocks.length - 1].content
    const logs = content.actions.map(a => a.type).asMutable()
    if (Object.keys(content.errors).length) {
      logs.push({ errors: content.errors })
    }
    logger.log(logs)
    const updateChildren = content.actions.filter(
      a => a.type === '@@interbit/UPDATE_CHILDREN'
    )
    if (updateChildren.length) {
      const newChainIds = []
        .concat(...updateChildren.map(n => n.payload.createdChildIds))
        .filter(String)
      newChainIds.forEach(async cId => {
        logChain({ cli, chainAlias: 'child', chainId: cId, format })
      })
    }
  })
}
