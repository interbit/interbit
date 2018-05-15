// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const assert = require('assert')
const interbit = require('interbit-core')
const genesisBlock = require('./genesisBlock')

const verifyApi = (api, expectedApi) => {
  const extras = Object.keys(api).reduce(
    (acc, key) => (expectedApi[key] ? acc : acc.concat(key)),
    []
  )
  assert.deepEqual(extras, [], 'Interface has extra properties or methods')

  const missing = Object.keys(expectedApi).reduce(
    (acc, key) => (api[key] ? acc : acc.concat(key)),
    []
  )
  assert.deepEqual(missing, [], 'Interface has missing properties or methods')

  Object.entries(expectedApi).forEach(([key, expectedType]) => {
    assert.equal(
      typeof api[key],
      expectedType,
      `${key} is not a ${expectedType}`
    )
  })
}

describe('interbit', () => {
  it('is imported', () => {
    assert.ok(interbit)
  })

  it('has an expected API', () => {
    console.log('interbit: ', interbit)

    const expectedInterbitApi = {
      createHypervisor: 'function',
      createCli: 'function',
      commonActions: 'object',
      createGenesisBlock: 'function',
      createDefaultSponsoredChainConfig: 'function',
      genesisConfigBuilder: 'function',
      generateKeyPair: 'function'
    }

    verifyApi(interbit, expectedInterbitApi)
  })

  describe('hypervisor', () => {
    let hypervisor
    let keyPair

    // regular function is required for before to honour timeout
    // eslint-disable-next-line prefer-arrow-callback
    before(async function() {
      this.timeout(5000)
      keyPair = await interbit.generateKeyPair()
      hypervisor = await interbit.createHypervisor({ keyPair })
    })

    after(async () => {
      if (hypervisor) {
        hypervisor.stopHyperBlocker()
      }
    })

    it('has expected API', () => {
      console.log('hypervisor: ', hypervisor)

      const expectedHypervisorApi = {
        dispatch: 'function',
        getState: 'function',
        subscribe: 'function',
        startHyperBlocker: 'function',
        stopHyperBlocker: 'function',
        getCurrentBlock: 'function',
        setHeavyBlockInterval: 'function',
        waitForState: 'function',
        chainId: 'string',
        keyPair: 'object'
      }

      verifyApi(hypervisor, expectedHypervisorApi)
    })

    it('boots with the supplied key', () => {
      assert.deepEqual(hypervisor.keyPair, keyPair)
    })

    describe('cli', () => {
      let cli

      before(async () => {
        cli = await interbit.createCli(hypervisor)
      })

      it('has expected API', async () => {
        console.log('cli: ', cli)

        const expectedCliApi = {
          connect: 'function',
          createChain: 'function',
          startChain: 'function',
          loadChain: 'function',
          getChain: 'function',
          removeChain: 'function',
          generateKeyPair: 'function',
          getKeys: 'function',
          createGenesisBlock: 'function',
          getState: 'function',
          subscribe: 'function',
          kvPut: 'function',
          kvGet: 'function',
          sendChainToSponsor: 'function',
          deployCovenant: 'function',
          applyCovenant: 'function',
          startServer: 'function',
          stopServer: 'function',
          shutdown: 'function',
          destroyChain: 'function'
        }

        verifyApi(cli, expectedCliApi)
      })

      it('will boot a chain that has the chain ID specified in the generated genesis block', async () => {
        const chainId = await cli.startChain({ genesisBlock })
        assert.equal(chainId, genesisBlock.blockHash)
      })

      describe('chain', () => {
        it('has expected API', async () => {
          const chainId = await cli.createChain()
          const chain = await cli.getChain(chainId)
          console.log('chain: ', chain)

          const expectedChainApi = {
            dispatch: 'function',
            getState: 'function',
            getCurrentBlock: 'function',
            subscribe: 'function'
          }

          verifyApi(chain, expectedChainApi)
        })

        // interbit-core 0.7.0 regression - unsubscribe() does not unsubscribe #186
        it('subscribe and unsubscribe work', async () => {
          const chainId = await cli.createChain()
          const chain = await cli.getChain(chainId)
          let unsubscribe = () => {}
          let count = 0
          console.time('Time to unsubscribe')
          unsubscribe = chain.subscribe(() => {
            console.log(`Subscribe callback: ${count}`)
            count += 1
            if (count === 1) {
              unsubscribe()
              console.timeEnd('Time to unsubscribe')
            }
          })
          // Potentially brittle
          // Test needs to wait for at least 2 blocks
          // sleep timeout assumes a blocking frequency of 2 secs
          // test timeout needs to be longer than the sleep period
          await sleep(4500)
          assert.equal(count, 1)
        }).timeout(5000)

        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
      })
    })
  })
})
