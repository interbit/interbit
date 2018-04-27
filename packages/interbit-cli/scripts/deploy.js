// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const path = require('path')
const {
  coreCovenant: {
    actionCreators: {
      startConsumeState,
      startProvideState,
      authorizeReceiveActions,
      authorizeSendActions
    }
  },
  manifestCovenant: {
    actionCreators: { setManifest }
  }
} = require('interbit-covenant-tools')
const {
  argOptions: { ADMIN_KEYS },
  constants: { joinTypes },
  createChains: { createChainsFromManifest },
  startInterbit,
  getArtifactsLocation,
  getKeyPair,
  getManifest,
  getPort,
  manifestSelectors: {
    getChains,
    getRootChildren,
    getChainIdByAlias,
    getCovenantHashByAlias
  }
} = require('interbit')

const deploy = async () => {
  const interbitManifest = getManifest()
  const artifactsLocation = getArtifactsLocation()
  const port = getPort()
  const keyPair = getKeyPair()
  const location = path.relative(process.cwd(), artifactsLocation)

  console.log(location, interbitManifest)
  console.log('MANIFEST CHAIN IDs', getChains(interbitManifest))

  if (!keyPair) {
    console.warn(
      `DEPLOY-WARNING: You are about to launch a node without ${ADMIN_KEYS}. The hypervisor will generate a new pair which may not match your ACL or network configuration.`
    )
  }

  const { cli } = await startInterbit(keyPair, { port })
  await createChainsFromManifest(location, cli, interbitManifest)

  await configureChains(cli, interbitManifest)

  // TODO: Once deployed, watch the root chain for manifest updates and reconfigure #267
}

const configureChains = async (cli, interbitManifest) => {
  const childChains = getRootChildren(interbitManifest)
  const childChainEntries = Object.entries(childChains)

  for (const [chainAlias, chainEntry] of childChainEntries) {
    const chainId = getChainIdByAlias(chainAlias, interbitManifest)
    const chainInterface = cli.getChain(chainId)

    // TODO: Set covenants in watchers after cascading deployment is available
    const covenantHash = getCovenantHashByAlias(chainAlias, interbitManifest)
    console.log(`Applying ${covenantHash} covenant to chain ${chainId}`)
    await cli.applyCovenant(chainId, covenantHash)

    // TODO: Apply interbit-covenant-tools to root #267

    const joins = chainEntry.joins
    if (joins) {
      configureJoins(chainInterface, joins, interbitManifest)
    }

    chainInterface.dispatch({ type: '@@interbit/DEPLOY' })

    // TODO: Only dispatch this to the root once cascading deployment is available
    const setManifestAction = setManifest(interbitManifest)
    console.log(setManifestAction)
    chainInterface.dispatch(setManifestAction)
  }
}

const configureJoins = (chainInterface, joins, interbitManifest) => {
  const consume = configureConsume(joins[joinTypes.CONSUME], interbitManifest)
  const provide = configureProvide(joins[joinTypes.PROVIDE], interbitManifest)
  const send = configureSend(joins[joinTypes.SEND], interbitManifest)
  const receive = configureReceive(joins[joinTypes.RECEIVE], interbitManifest)

  const joinActions = [...consume, ...provide, ...send, ...receive]
  console.log('JOINING', joinActions)
  for (const action of joinActions) {
    chainInterface.dispatch(action)
  }
}

const configureConsume = (consume, interbitManifest) => {
  if (!consume || !consume.length) {
    return []
  }
  return consume.reduce(
    (prev, { alias: chainAlias, path: mount, joinName }) => {
      const provider = getChainIdByAlias(chainAlias, interbitManifest)
      const consumeAction = startConsumeState({
        provider,
        mount,
        joinName
      })
      return prev.concat(consumeAction)
    },
    []
  )
}

const configureProvide = (provide, interbitManifest) => {
  if (!provide || !provide.length) {
    return []
  }
  return provide.reduce(
    (prev, { alias: chainAlias, path: statePath, joinName }) => {
      const consumer = getChainIdByAlias(chainAlias, interbitManifest)
      const provideAction = startProvideState({
        consumer,
        statePath,
        joinName
      })
      return prev.concat(provideAction)
    },
    []
  )
}

const configureReceive = (receive, interbitManifest) => {
  if (!receive || !receive.length) {
    return []
  }
  return receive.reduce((prev, { alias: chainAlias, authorizedActions }) => {
    const senderChainId = getChainIdByAlias(chainAlias, interbitManifest)
    const receiveAction = authorizeReceiveActions({
      senderChainId,
      authorizedActions
    })
    return prev.concat(receiveAction)
  }, [])
}

const configureSend = (send, interbitManifest) => {
  if (!send || !send.length) {
    return []
  }
  return send.reduce((prev, { alias: chainAlias }) => {
    const receiverChainId = getChainIdByAlias(chainAlias, interbitManifest)
    const sendAction = authorizeSendActions({
      receiverChainId
    })
    return prev.concat(sendAction)
  }, [])
}

deploy()
