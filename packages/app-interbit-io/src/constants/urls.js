import { generateServiceUrl } from 'interbit-platform-tools'

const storeUrl = generateServiceUrl('store')

export default {
  APP_STORE_CREATE_IB_APP: `${storeUrl}/apps/createIBApp`,
  BTL_ABOUT: 'http://btl.co/about/',
  BTL_BLOG: 'http://btl.co/blog/',
  BTL_CONTACT: 'http://btl.co/contact-us/',
  BTL_INVESTOR: 'http://btl.co/investor/',
  BTL_NEWS: 'http://btl.co/news/',
  GITHUB_IB: 'https://github.com/interbit/interbit',
  SDK_DOCS: 'https://docs.test-interbit.io'
}
