const assert = require('assert')
const Immutable = require('seamless-immutable')

const {
  packState,
  parseState,
  packCAuthParams,
  parseCAuthParams
} = require('../../parameterEncoding')

describe('parameterEncoding', () => {
  describe('packState/parseState', () => {
    const testCases = [
      '',
      'Some state',
      {},
      {
        appPublic: {
          chainAlias: 'appPublic',
          chainId: '123456...'
        },
        appConsumer: {
          chainAlias: 'appPrivate',
          chainId: '987654...'
        },
        publicKey: 'xk0EW3sKuwECAJWxUyf1R/YR...',
        tokens: ['name', 'alias', 'someOtherThing']
      }
    ]

    const urlSafeBase64RegEx = /^[A-Za-z0-9_-]*$/

    testCases.forEach(stateIn => {
      it(`round trips cleanly: ${JSON.stringify(stateIn)}`, () => {
        const packedState = packState(stateIn)
        const stateOut = parseState(packedState)

        assert.deepStrictEqual(stateOut, stateIn)
      })

      it(`encodes as url safe base64: ${JSON.stringify(stateIn)}`, () => {
        const packedState = packState(stateIn)

        assert(urlSafeBase64RegEx.test(packedState))
      })
    })
  })

  describe('packCAuthParams/parseCAuthParams', () => {
    const publicChainAlias = 'NoodlesAppPublic'
    const privateChainAlias = 'MyNoodles'

    const chainId1 = '123456...'
    const chainState1 = {
      interbit: { chainId: chainId1 }
    }

    const chainId2 = '789012...'
    const chainState2 = {
      ramen: ['noodles', 'soup', 'love'],
      interbit: { chainId: chainId2 }
    }

    const middlewareState = Immutable.from({
      status: 'READY',
      publicKey: 'xk0EW2IFQgECAKY8gkAVo6LyqbYeL6iQO...',
      chains: {
        [publicChainAlias]: chainState1,
        [privateChainAlias]: chainState2
      }
    })

    const state = { interbit: middlewareState }
    const tokens = ['name', 'alias', 'something else']
    const redirectUrl = 'https://mynoodles.com:9090/cauth'
    const encodedRedirectUrl = encodeURIComponent(redirectUrl)

    it('passes parameters required for cAuth', () => {
      const packedParams = packCAuthParams(state, {
        publicChainAlias,
        privateChainAlias,
        tokens,
        redirectUrl
      })

      const parsedParams = parseCAuthParams(packedParams)

      assert.deepStrictEqual(parsedParams, {
        redirectUrl,
        appPublic: { chainAlias: publicChainAlias, chainId: chainId1 },
        appConsumer: { chainAlias: privateChainAlias, chainId: chainId2 },
        tokens
      })
    })

    const queryRegEx = new RegExp(
      `^redirectUrl=${encodedRedirectUrl}&state=[A-Za-z0-9_-]*$`
    )

    it('encodes as url encoded redirectUrl and url safe base64 encoded state', () => {
      const queryParams = packCAuthParams(state, {
        publicChainAlias,
        privateChainAlias,
        tokens,
        redirectUrl
      })

      assert(queryRegEx.test(queryParams))
    })
  })
})
