const assert = require('assert')
const { getArg, getArgs, isArg } = require('../../args/getArg')

const argName = '--argname'
const anotherArgName = '--another-argname'
const argValue = 'argvalue'

describe('args', () => {
  describe('getArg(argv, argName)', () => {
    it('finds an arg that exists', () => {
      const argv = ['interbit', 'start', argName, argValue]
      const arg = getArg(argv, argName)

      assert.strictEqual(arg, argValue)
    })

    it('does not explode if arg was named but not supplied', () => {
      const argv = ['interbit', 'start', argName]
      const arg = getArg(argv, argName)
      assert.strictEqual(arg, undefined)
    })

    it('returns undefined if argName is followed by another argName', () => {
      const argv = ['interbit', 'start', argName, anotherArgName]
      const arg = getArg(argv, argName)
      assert.strictEqual(arg, undefined)
    })

    it('returns undefined if arg does not exist', () => {
      const argv = ['interbit', 'start']
      const arg = getArg(argv, argName)
      assert.strictEqual(arg, undefined)
    })
  })

  describe('getArgs(argv, argName)', () => {
    it('returns an empty array when no args are specified', () => {
      const argv = ['interbit', 'start']
      const expectedArgs = []

      const args = getArgs(argv, argName)

      assert.deepStrictEqual(args, expectedArgs)
    })

    it('returns an empty array when argName is followed by another argName', () => {
      const argv = ['interbit', 'start', argName, anotherArgName]
      const expectedArgs = []

      const args = getArgs(argv, argName)

      assert.deepStrictEqual(args, expectedArgs)
    })

    it('returns an array of specified args if more than one was supplied', () => {
      const argv = [
        'interbit',
        'start',
        argName,
        argValue,
        argValue,
        argValue,
        anotherArgName
      ]
      const expectedArgs = [argValue, argValue, argValue]

      const args = getArgs(argv, argName)

      assert.deepStrictEqual(args, expectedArgs)
    })
  })

  describe('isArg(argv, argName)', () => {
    it('returns true when arg is specified', () => {
      const argv = ['interbit', 'start', argName]
      const arg = isArg(argv, argName)

      assert.strictEqual(arg, true)
    })

    it('returns false when arg is not specified', () => {
      const argv = ['interbit', 'start']
      const arg = isArg(argv, argName)

      assert.strictEqual(arg, false)
    })
  })
})
