const generateServiceUrl = name => {
  const host = window.location.host
  let url

  if (host.includes('localhost')) {
    url = localMap[name]
  } else if (host.startsWith('ib-dev-')) {
    url = devMap[name]
  } else if (host.startsWith('ib-stg-')) {
    url = stagingMap[name]
  } else if (host.startsWith('ib-prod-')) {
    url = prodMap[name]
  } else if (host.includes('interbit.io')) {
    url = liveMap[name]
  }

  return url || 'https://interbit.io'
}

const localMap = {
  accounts: 'http://localhost:3025',
  interbit: 'http://localhost:3020',
  projects: 'http://localhost:3035',
  store: 'http://localhost:3045',
  template: 'http://localhost:3000'
}
const devMap = {
  accounts: 'https://ib-dev-account.herokuapp.com',
  docs: 'https://ib-dev-docs.herokuapp.com',
  interbit: 'https://ib-dev-interbit-io.herokuapp.com',
  projects: 'https://ib-dev-app-projects.herokuapp.com',
  store: 'https://ib-dev-app-store.herokuapp.com',
  template: 'https://ib-dev-template.herokuapp.com'
}
const stagingMap = {
  accounts: 'https://ib-stg-account.herokuapp.com',
  docs: 'https://ib-stg-docs.herokuapp.com',
  interbit: 'https://ib-stg-interbit-io.herokuapp.com',
  projects: 'https://ib-stg-app-projects.herokuapp.com',
  store: 'https://ib-stg-app-store.herokuapp.com',
  template: 'https://ib-stg-template.herokuapp.com'
}
const prodMap = {
  accounts: 'https://ib-prod-account.herokuapp.com',
  docs: 'https://ib-prod-docs.herokuapp.com',
  interbit: 'https://ib-prod-interbit-io.herokuapp.com',
  projects: 'https://ib-prod-app-projects.herokuapp.com',
  store: 'https://ib-prod-app-store.herokuapp.com',
  template: 'https://ib-prod-template.herokuapp.com'
}
const liveMap = {
  accounts: 'https://accounts.test-interbit.io',
  docs: 'https://docs.test-interbit.io',
  interbit: 'https://interbit.io',
  store: 'https://store.test-interbit.io',
  template: 'https://template.test-interbit.io'
}

module.exports = { generateServiceUrl }
