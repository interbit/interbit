const generateServiceUrl = (name, port) => {
  const host = window.location.host
  console.log('host', host)
  if (host.includes('localhost')) {
    return `http://localhost:${port}`
  }
  if (host.includes('test-interbit.io')) {
    return `https://${name}.test-interbit.io`
  }
  const stage = getStage(host)
  return `https://ib-${stage}-${herokuMap[name]}.herokuapp.com`
}

const getStage = host => {
  const stage = host.split('-')[1]
  console.log('stage', stage)
  return stage
}

const herokuMap = {
  accounts: 'account',
  store: 'app-store',
  projects: 'app-projects'
}

const accountsUrl = generateServiceUrl('accounts', 3025)
const storeUrl = generateServiceUrl('store', 3000)
const projectUrl = generateServiceUrl('projects', 3035)

export default {
  APP_ACCOUNT: accountsUrl,
  APP_STORE: storeUrl,
  APP_STORE_ACCOUNTS: `${storeUrl}/apps/accounts`,
  APP_STORE_HOSTING: `${storeUrl}/apps/hosting`,
  APP_STORE_STORE: `${storeUrl}/apps/store`,
  APP_STORE_CREATE_IB_APP: `${storeUrl}/apps/createIBApp`,
  APP_PROJECT: projectUrl,
  BTL_ABOUT: 'http://btl.co/about/',
  BTL_BLOG: 'http://btl.co/blog/',
  BTL_CONTACT: 'http://btl.co/contact-us/',
  BTL_INVESTOR: 'http://btl.co/investor/',
  BTL_NEWS: 'http://btl.co/news/',
  GITHUB_IB: 'https://github.com/interbit/interbit',
  SDK_DOCS: 'https://docs.test-interbit.io',
  SUPPORT_SLACK: 'https://slack.test-interbit.io/',
  STARTING_BLOCK: 'http://thestartingblock.io'
}
