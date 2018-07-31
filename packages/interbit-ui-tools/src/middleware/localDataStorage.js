const localforage = require('localforage')

const DATASTORE_KEYS = {
  KEY_PAIR: 'interbit-keypair'
}

const storageConfig = {
  name: 'interbit-ui-tools',
  storeName: 'interbit_ui_tools'
}

const getDataStore = async () => {
  const datastore = await localforage.createInstance(storageConfig)
  await datastore.ready()
  return datastore
}

module.exports = { getDataStore, DATASTORE_KEYS }
