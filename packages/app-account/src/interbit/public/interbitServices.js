const generateUrlEntry = (name, port) =>
  process.env.REACT_APP_STAGE
    ? `https://ib-${process.env.REACT_APP_STAGE}-${name}.herokuapp.com`
    : `http://localhost:${port}`

const interbitServices = {
  accounts: {
    serviceEndpoint: generateUrlEntry('account', 3025)
  },
  projects: {
    serviceEndpoint: generateUrlEntry('app-projects', 3035)
  },
  identity: {
    serviceEndpoint: generateUrlEntry('identity-service', 3065)
  }
}

module.exports = interbitServices
