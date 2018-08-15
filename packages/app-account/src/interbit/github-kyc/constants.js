const {
  coreCovenant: { constants: coreConstants }
} = require('interbit-covenant-tools')

const OAUTH_ROOT = 'oAuth'
const SHARED = 'shared'
const PARAMS = 'params'
const TOKEN_URL = 'tokenUrl'
const PROFILE_URL = 'profileUrl'
const CALLBACK_URL = 'callbackUrl'
const CLIENT_ID = 'client_id'
const REDIRECT_URL = 'redirect_uri'
const SCOPE = 'scope'
const ALLOW_SIGNUP = 'allow_signup'

const PATHS = {
  ...coreConstants.PATHS,
  OAUTH: [OAUTH_ROOT],
  TOKEN_URL: [OAUTH_ROOT, TOKEN_URL],
  PROFILE_URL: [OAUTH_ROOT, PROFILE_URL],
  CALLBACK_URL: [OAUTH_ROOT, CALLBACK_URL],
  PARAMS: [OAUTH_ROOT, SHARED, PARAMS],
  CLIENT_ID: [OAUTH_ROOT, SHARED, PARAMS, CLIENT_ID],
  REDIRECT_URL: [OAUTH_ROOT, SHARED, PARAMS, REDIRECT_URL],
  SCOPE: [OAUTH_ROOT, SHARED, PARAMS, SCOPE],
  ALLOW_SIGNUP: [OAUTH_ROOT, SHARED, PARAMS, ALLOW_SIGNUP]
}

module.exports = { PATHS }
