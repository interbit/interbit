import { generateServiceUrl } from 'lib-react-interbit'

const accountUrl = generateServiceUrl('accounts', 3025)
const interbitIoUrl = generateServiceUrl('interbit-io', 3020)
const storeUrl = generateServiceUrl('store', 3000)

export default {
  APP_ACCOUNT: accountUrl,
  APP_IB_IO: interbitIoUrl,
  APP_IB_IO_POLICY_PRIVACY: `${interbitIoUrl}/policy/privacy`,
  APP_IB_IO_POLICY_TOS: `${interbitIoUrl}/policy/terms-of-use`,
  APP_STORE: storeUrl,
  SUPPORT_SLACK: 'https://slack.test-interbit.io/'
}
