const {
  coreCovenant: {
    actionCreators: {
      startConsumeState,
      startProvideState,
      authorizeReceiveActions,
      authorizeSendActions
    }
  },
  config: {
    selectors: { getChainJoins, getJoinTypeForChain }
  },
  constants: { JOIN_TYPES }
} = require('interbit-covenant-tools')

const log = require('../log')

// SET FOR DEPRECATION: Pending issue #79
/**
 * Configures chains in the node's cli to be joined according to config.
 * Used within the interbit `start` script and set for pending deprecation. (#263)
 * @deprecated
 * @param {Object} manifest - The covenant hashes and chain ids mapped to aliases
 *  for the node from the `generateDeploymentDetails` function.
 * @param {Object} cli - The cli for the node.
 * @param {Object} config - The interbit config file specifying join configuration.
 */
const joinChains = async (manifest, cli, config) => {
  log.info('JOINING CHAINS')
  try {
    for (const [chainAlias, chainDetails] of Object.entries(manifest)) {
      const chainInterface = await cli.getChain(chainDetails.chainId)
      if (getChainJoins(chainAlias, config)) {
        const provide = getJoinTypeForChain(
          chainAlias,
          JOIN_TYPES.PROVIDE,
          config
        )
        const consume = getJoinTypeForChain(
          chainAlias,
          JOIN_TYPES.CONSUME,
          config
        )
        const sendActionTo = getJoinTypeForChain(
          chainAlias,
          JOIN_TYPES.SEND,
          config
        )
        const receiveActionFrom = getJoinTypeForChain(
          chainAlias,
          JOIN_TYPES.RECEIVE,
          config
        )

        await establishConsumes(chainInterface, consume, manifest)
        await establishProvides(chainInterface, provide, manifest)
        await establishReceiveActions(
          chainInterface,
          receiveActionFrom,
          manifest
        )
        await establishSendActions(chainInterface, sendActionTo, manifest)
      }
      const state = await chainInterface.getState()
      log.info({ chainAlias, chainDetails, state })
    }

    log.success('JOINING COMPLETE')
  } catch (err) {
    log.error(err.message)
    throw err
  }
}

const establishConsumes = async (chainInterface, consume, manifest) => {
  if (!consume || !consume.length) {
    return
  }
  for (const { alias, path: mount, joinName } of consume) {
    if (!alias || !manifest[alias]) {
      log.warn(`Unknown alias: ${alias}`)
      continue
    }
    const { chainId: provider } = manifest[alias]
    const consumeAction = startConsumeState({
      provider,
      mount,
      joinName
    })
    log.action(consumeAction)
    await chainInterface.dispatch(consumeAction)
  }
}

const establishProvides = async (chainInterface, provide, manifest) => {
  if (!provide || !provide.length) {
    return
  }
  for (const { alias, path: statePath, joinName } of provide) {
    if (!alias || !manifest[alias]) {
      log.warn(`Unknown alias: ${alias}`)
      continue
    }
    const { chainId: consumer } = manifest[alias]
    const provideAction = startProvideState({
      consumer,
      statePath,
      joinName
    })
    log.action(provideAction)
    await chainInterface.dispatch(provideAction)
  }
}

const establishReceiveActions = async (
  chainInterface,
  receiveActionFrom,
  manifest
) => {
  if (!receiveActionFrom || !receiveActionFrom.length) {
    return
  }
  for (const { alias, authorizedActions } of receiveActionFrom) {
    if (!alias || !manifest[alias]) {
      log.warn(`Unknown alias: ${alias}`)
      continue
    }
    if (!authorizedActions) {
      log.warn(`No authorized actions for write join to: ${alias}`)
      continue
    }
    const { chainId: senderChainId } = manifest[alias]
    const authorizeReceiveAction = authorizeReceiveActions({
      senderChainId,
      permittedActions: authorizedActions
    })
    log.action(authorizeReceiveAction)
    await chainInterface.dispatch(authorizeReceiveAction)
  }
}

const establishSendActions = async (chainInterface, sendActionTo, manifest) => {
  if (!sendActionTo || !sendActionTo.length) {
    return
  }
  for (const { alias } of sendActionTo) {
    if (!alias || !manifest[alias]) {
      log.warn(`Unknown alias: ${alias}`)
      continue
    }
    const { chainId: receiverChainId } = manifest[alias]
    const authorizeSendAction = authorizeSendActions({
      receiverChainId
    })
    log.action(authorizeSendAction)
    await chainInterface.dispatch(authorizeSendAction)
  }
}

module.exports = { joinChains }
