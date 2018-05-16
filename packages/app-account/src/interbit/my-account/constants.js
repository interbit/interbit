const {
  coreCovenant: { constants: coreConstants }
} = require('interbit-covenant-tools')

const SHARED_ROOT = 'shared'
const SHARED_PROFILE = 'sharedProfile'
const PRIVATE_PROFILE = 'profile'
const AUTH_REQUESTS = 'authenticationRequests'
const ALIAS = 'alias'
const EMAIL = 'email'
const NAME = 'name'

const PATHS = {
  ...coreConstants.PATHS,
  PRIVATE_PROFILE: [PRIVATE_PROFILE],
  SHARED_ROOT: [SHARED_ROOT],
  USERNAME: [PRIVATE_PROFILE, ALIAS],
  EMAIL: [PRIVATE_PROFILE, EMAIL],
  NAME: [PRIVATE_PROFILE, NAME],
  AUTH_REQUESTS: [AUTH_REQUESTS]
}

module.exports = {
  SHARED_ROOT,
  SHARED_PROFILE,
  PRIVATE_PROFILE,
  PATHS
}
