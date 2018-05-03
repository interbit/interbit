const {
  coreCovenant: {
    actionCreators: {
      startConsumeState,
      startProvideState,
      authorizeReceiveActions,
      authorizeSendActions
    }
  }
} = require('interbit-covenant-tools')

const { joinTypes } = require('./constants')
const { getChainIdByAlias } = require('../manifest/manifestSelectors')

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

module.exports = configureJoins
