const {
  coreCovenant: { constants: coreConstants }
} = require('interbit-covenant-tools')

const PATHS = {
  ...coreConstants.PATHS,
  OAUTH: ['oAuth'],
  TOKEN_URL: ['oAuth', 'tokenUrl'],
  PROFILE_URL: ['oAuth', 'profileUrl'],
  CALLBACK_URL: ['oAuth', 'callbackUrl'],
  PARAMS: ['oAuth', 'shared', 'params'],
  CLIENT_ID: ['oAuth', 'shared', 'params', 'client_id'],
  REDIRECT_URL: ['oAuth', 'shared', 'params', 'redirect_uri'],
  SCOPE: ['oAuth', 'shared', 'params', 'scope'],
  ALLOW_SIGNUP: ['oAuth', 'shared', 'params', 'allow_signup']
}

module.exports = { PATHS }
