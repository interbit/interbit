const { actionTypes: controlActionTypes } = require('../interbit/control')
const { actionTypes: githubActionTypes } = require('../interbit/github-kyc')
const { actionTypes: privateActionTypes } = require('../interbit/my-account')
const { actionTypes: publicActionTypes } = require('../interbit/public')

module.exports = {
  controlActionTypes,
  githubActionTypes,
  privateActionTypes,
  publicActionTypes
}
