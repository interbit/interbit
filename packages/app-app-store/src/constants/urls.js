import { generateServiceUrl } from 'interbit-platform-tools'

const accountUrl = generateServiceUrl('accounts')
const projectUrl = generateServiceUrl('projects')
const interbitIoUrl = generateServiceUrl('interbit')

export default {
  APP_ACCOUNT: accountUrl,
  APP_PROJECT: projectUrl,
  APP_INTERBIT_IO: interbitIoUrl,
  APP_IB_IO_PLATFORM: `${interbitIoUrl}/platform`,
  APP_IB_IO_DEVS: `${interbitIoUrl}/developers`,
  APP_IB_IO_SUPPORT: `${interbitIoUrl}/developers/support`,
  APP_IB_IO_POLICY_PRIVACY: `${interbitIoUrl}/policy/privacy`,
  APP_IB_IO_POLICY_TOS: `${interbitIoUrl}/policy/terms-of-use`,
  SUPPORT_SLACK: 'http://slack.test-interbit.io/',
  GITHUB_IB: 'https://github.com/interbit',
  TRUCK_LOVELY_URL: 'https://helixaccelerator.ca/'
}
