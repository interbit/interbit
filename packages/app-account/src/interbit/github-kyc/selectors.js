const { PATHS } = require('./constants')

const selectors = {
  oAuthConfig: state => state.getIn(PATHS.OAUTH),
  tokenUrl: state => state.getIn(PATHS.TOKEN_URL),
  profileUrl: state => state.getIn(PATHS.PROFILE_URL),
  callbackUrl: state => state.getIn(PATHS.CALLBACK_URL),
  clientId: state => state.getIn(PATHS.CLIENT_ID),
  params: state => state.getIn(PATHS.PARAMS),
  redirectUrl: state => state.getIn(PATHS.REDIRECT_URL),
  scope: state => state.getIn(PATHS.SCOPE),
  allowSignup: state => state.getIn(PATHS.ALLOW_SIGNUP),
  joinProviders: state => state.getIn(PATHS.PROVIDING, [])
}

module.exports = selectors
