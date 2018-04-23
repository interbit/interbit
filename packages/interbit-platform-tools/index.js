const generateServiceUrl = (name, port) => {
  console.log('name:', name)
  const host = window.location.host
  // const map =
  console.log('host', host)
  if (host.includes('localhost')) {
    return `http://localhost:${port}`
  }
  if (name === 'interbit.io') {
    if (!host.includes('herokuapp')) {
      return 'https://interbit.io'
    }
  }
  if (host.includes('interbit.io')) {
    return `https://${name}.test-interbit.io`
  }
  if (host.includes('test-interbit.io')) {
    return `https://${name}.test-interbit.io`
  }

  const serverName = herokuMap[name] || 'app-interbit-io'
  const stage = getStage(host)
  return `https://ib-${stage}-${serverName}.herokuapp.com`
}

const getStage = host => {
  const stage = host.split('-')[1]
  console.log('stage', stage)
  return stage
}

const herokuMap = {
  accounts: 'account',
  store: 'app-store',
  projects: 'app-projects',
  'interbit.io': 'app-interbit-io'
}

// const localMap = {
//   accounts: 'http://localhost:3025',
//   interbitIo: 'http://localhost:3035',
//   store: 'http://localhost:3000'
// }
// const devMap = {
//   accounts: 'https://ib-dev-app-accounts.herokuapp.com'
// }
// const stagingMap = {
//   accounts: 'https://ib-stg-app-accounts.herokuapp.com'
// }
// const prodMap = {
//   accounts: 'https://ib-prod-app-accounts.herokuapp.com'
// }
// const liveMap = {
//   accounts: 'https://accounts.test-interbit.io',
//   docs: 'https://docs.test-interbit.io',
//   interbitIo: 'https://interbit.io',
//   store: 'https://store.test-interbit.io',
//   template: 'https://template.test-interbit.io'
// }

// https://interbit.io
// https://github.com/interbit/interbit/
// https://store.test-interbit.io
// https://accounts.test-interbit.io
// https://docs.test-interbit.io
// https://template.test-interbit.io
// https://slack.test-interbit.io

// const accountUrl = generateServiceUrl('accounts', 3025)
// const projectUrl = generateServiceUrl('projects', 3035)
// const interbitIoUrl = generateServiceUrl('interbit.io', 3020)

module.exports = { generateServiceUrl }
