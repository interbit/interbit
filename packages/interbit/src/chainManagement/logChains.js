const { loggingFactory } = require('../logging/logging-factory')

const UPDATE_CHILDREN = '@@interbit/UPDATE_CHILDREN'

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

const getChildrenIdsOfContentPayload = async ({ content }) =>
  content.actions
    .filter(a => a.type === UPDATE_CHILDREN)
    .map(n => n.payload.createdChildIds)
    .filter(String)

const logChain = async ({
  cli,
  chainAlias,
  chainId,
  childLogging = false,
  format = 'console'
}) => {
  const chainInterface = cli.getChain(chainId)
  const logger = loggingFactory({
    format,
    group: 'interbit-logging',
    name: chainAlias
  })
  await logger.connect()

  chainInterface.subscribe(() => {
    const appState = chainInterface.getState()
    const { blocks } = appState.interbit
    const { content } = blocks[blocks.length - 1]
    const { errors } = content
    const logs = content.actions.map(a => a.type).asMutable()
    if (Object.keys(errors).length) logs.push({ errors })

    logger.log(logs)

    if (childLogging)
      getChildrenIdsOfContentPayload({ content }).forEach(childId =>
        logChain({ cli, chainAlias: childId, chainId: childId, format })
      )
  })
}
