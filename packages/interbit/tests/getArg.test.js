const assert = require('assert')
const { getArg, getArgs, isArg } = require('../src/args/getArg')

const argName = '--argname'
const argValue = 'argvalue'

describe('args', () => {
  describe('getArg(argv, argName)', () => {
    it('finds an arg that exists', () => {
      const argv = ['interbit', 'start', argName, argValue]
      const arg = getArg(argv, argName)

      assert.equal(arg, argValue)
    })

    it('does not explode if arg was named but not supplied', () => {
      const argv = ['interbit', 'start', argName]
      const arg = getArg(argv, argName)
      assert.equal(arg, undefined)
    })

    it('returns undefined if arg does not exist', () => {
      const argv = ['interbit', 'start']
      const arg = getArg(argv, argName)
      assert.equal(arg, undefined)
    })
  })

  describe('getArgs(argv, argName)', () => {
    it('returns an empty array when no args are specified', () => {
      const argv = ['interbit', 'start']
      const expectedArgs = []

      const args = getArgs(argv, argName)

      assert.deepEqual(args, expectedArgs)
    })

    it('returns an array of specified args if more than one was supplied', () => {
      const argv = ['interbit', 'start', argName, argValue, argValue, argValue]
      const expectedArgs = [argValue, argValue, argValue]

      const args = getArgs(argv, argName)

      assert.deepEqual(args, expectedArgs)
    })
  })

  describe('isArg(argv, argName)', () => {
    it('returns true when arg is specified', () => {
      const argv = ['interbit', 'start', argName]
      const arg = isArg(argv, argName)

      assert.equal(arg, true)
    })

    it('returns false when arg is not specified', () => {
      const argv = ['interbit', 'start']
      const arg = isArg(argv, argName)

      assert.equal(arg, false)
    })
  })
})
