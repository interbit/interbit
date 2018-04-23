const generateServiceUrl = (name, port) =>
  process.env.REACT_APP_STAGE
    ? `https://ib-${process.env.REACT_APP_STAGE}-${name}.herokuapp.com`
    : `http://localhost:${port}`

const accountUrl = generateServiceUrl('account', 3025)
const interbitIoUrl = generateServiceUrl('interbit-io', 3020)
const storeUrl = generateServiceUrl('app-store', 3000)

export default {
  APP_ACCOUNT: accountUrl,
  APP_IB_IO: interbitIoUrl,
  APP_IB_IO_POLICY_PRIVACY: `${interbitIoUrl}/policy/privacy`,
  APP_IB_IO_POLICY_TOS: `${interbitIoUrl}/policy/terms-of-use`,
  APP_STORE: storeUrl,
  SUPPORT_SLACK: 'https://slack.test-interbit.io/'
}
