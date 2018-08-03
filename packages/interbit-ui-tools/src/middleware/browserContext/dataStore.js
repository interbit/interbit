const localforage = require('localforage')

const storageConfig = {
  name: 'interbit-ui-tools',
  storeName: 'interbit_ui_tools'
}

const createDataStore = async () => {
  const datastore = await localforage.createInstance(storageConfig)
  await datastore.ready()
  return datastore
}

module.exports = createDataStore
