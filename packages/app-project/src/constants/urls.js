import { generateServiceUrl } from 'interbit-platform-tools'

const accountUrl = generateServiceUrl('accounts')
const interbitIoUrl = generateServiceUrl('interbit')
const storeUrl = generateServiceUrl('store')

export default {
  APP_ACCOUNT: accountUrl,
  APP_IB_IO: interbitIoUrl,
  APP_IB_IO_POLICY_PRIVACY: `${interbitIoUrl}/policy/privacy`,
  APP_IB_IO_POLICY_TOS: `${interbitIoUrl}/policy/terms-of-use`,
  APP_STORE: storeUrl,
  SUPPORT_SLACK: 'http://slack.test-interbit.io/'
}
