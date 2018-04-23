import { generateServiceUrl } from 'interbit-platform-tools'

const interbitIoUrl = generateServiceUrl('interbit.io', 3020)
const projectUrl = generateServiceUrl('projects', 3035)
const storeUrl = generateServiceUrl('store', 3000)

export default {
  APP_IB_IO: interbitIoUrl,
  APP_IB_IO_POLICY_PRIVACY: `${interbitIoUrl}/policy/privacy`,
  APP_IB_IO_POLICY_TOS: `${interbitIoUrl}/policy/terms-of-use`,
  APP_IB_IO_DEVELOPERS: `${interbitIoUrl}/developers`,
  APP_IB_IO_DEVELOPERS_SUPPORT: `${interbitIoUrl}/developers/support`,
  APP_IB_IO_PLATFORM: `${interbitIoUrl}/platform`,
  APP_PROJECT: projectUrl,
  APP_STORE: storeUrl,
  SUPPORT_SLACK: 'http://slack.test-interbit.io/'
}
