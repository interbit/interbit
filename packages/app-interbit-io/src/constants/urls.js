import { generateServiceUrl } from 'interbit-platform-tools'

const accountsUrl = generateServiceUrl('accounts')
const storeUrl = generateServiceUrl('store')
const projectUrl = generateServiceUrl('projects')

export default {
  APP_ACCOUNT: accountsUrl,
  APP_STORE: storeUrl,
  APP_STORE_ACCOUNTS: `${storeUrl}/apps/accounts`,
  APP_STORE_HOSTING: `${storeUrl}/apps/hosting`,
  APP_STORE_CREATE_IB_APP: `${storeUrl}/apps/createIBApp`,
  APP_PROJECT: projectUrl,
  BTL_ABOUT: 'http://btl.co/about/',
  BTL_BLOG: 'http://btl.co/blog/',
  BTL_CONTACT: 'http://btl.co/contact-us/',
  BTL_INVESTOR: 'http://btl.co/investor/',
  BTL_NEWS: 'http://btl.co/news/',
  GITHUB_IB: 'https://github.com/interbit/interbit',
  SDK_DOCS: 'https://docs.test-interbit.io',
  SUPPORT_SLACK: 'http://slack.test-interbit.io/',
  STARTING_BLOCK: 'http://thestartingblock.io'
}
