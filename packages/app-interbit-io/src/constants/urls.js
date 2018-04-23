const generateServiceUrl = (name, port) =>
  process.env.REACT_APP_STAGE
    ? `https://ib-${process.env.REACT_APP_STAGE}-${name}.herokuapp.com`
    : `http://localhost:${port}`

const accountUrl = generateServiceUrl('account', 3025)
const storeUrl = generateServiceUrl('app-store', 3000)
const projectUrl = generateServiceUrl('app-projects', 3035)

export default {
  APP_ACCOUNT: accountUrl,
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
  GITHUB_IB: 'https://github.com/interbit',
  SDK_DOCS: 'https://github.com/interbit/interbit/docs/interbit-sdk/gitbook',
  SUPPORT_SLACK: 'https://slack.test-interbit.io/',
  STARTING_BLOCK: 'http://thestartingblock.io'
}
