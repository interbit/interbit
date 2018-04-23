const generateServiceUrl = (name, port) =>
  process.env.REACT_APP_STAGE
    ? `https://ib-${process.env.REACT_APP_STAGE}-${name}.herokuapp.com`
    : `http://localhost:${port}`

const accountUrl = generateServiceUrl('account', 3025)
const projectUrl = generateServiceUrl('app-projects', 3035)
const interbitIoUrl = generateServiceUrl('interbit-io', 3020)

export default {
  APP_ACCOUNT: accountUrl,
  APP_PROJECT: projectUrl,
  APP_INTERBIT_IO: interbitIoUrl,
  APP_IB_IO_PLATFORM: `${interbitIoUrl}/platform`,
  APP_IB_IO_DEVS: `${interbitIoUrl}/developers`,
  APP_IB_IO_SUPPORT: `${interbitIoUrl}/developers/support`,
  APP_IB_IO_POLICY_PRIVACY: `${interbitIoUrl}/policy/privacy`,
  APP_IB_IO_POLICY_TOS: `${interbitIoUrl}/policy/terms-of-use`,
  SUPPORT_SLACK: 'https://slack.test-interbit.io/',
  GITHUB_IB: 'https://github.com/interbit'
}
