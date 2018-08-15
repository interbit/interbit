const assert = require('assert')
const {
  startTimer,
  sendMessageToSlack,
  formatError
} = require('../helpers/runTimedBrowserStackTest')
const {
  getRandomCapabilities,
  metaCapabilities
} = require('../helpers/browserStackCapabilities')

describe('MTTF Helper function unit tests', () => {
  describe('startTimer', () => {
    it.skip('doesnt throw on startTimer', () => {
      const func = startTimer(Date.now())
      assert.ok(func)

      func('THIS IS ACTUALLY A UNIT TEST SORRY GUYS')
      assert.ok(true)
    })
  })

  describe('sendMessageToSlack', () => {
    it.skip('sends a message to #errors in slack', () => {
      sendMessageToSlack('1, 2, 1, 2... This is just a test.')
    })
  })

  describe('getRandomCapabilities', () => {
    it('gets a capabilities object', () => {
      const capabilities = getRandomCapabilities()
      assert.ok(capabilities)
    })
  })

  describe('formatError', () => {
    it('does not include the browserstack user or key in the message', () => {
      const message = formatError('error', metaCapabilities)
      assert.ok(!message.includes('browserstack.user'))
      assert.ok(!message.includes('browserstack.key'))
    })
  })
})
