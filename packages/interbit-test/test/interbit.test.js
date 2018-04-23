// © 2018 BTL GROUP LTD -  This package is licensed under the MIT license https://opensource.org/licenses/MIT
const assert = require('assert')
const interbit = require('interbit-core')

describe('interbit', () => {
  it('is imported', () => {
    assert.ok(interbit)
  })

  it('has an expected API', () => {
    console.log('interbit: ', interbit)

    assert.ok(interbit.createHypervisor)
    assert.equal(typeof interbit.createHypervisor, 'function')

    assert.ok(interbit.createCli)
    assert.equal(typeof interbit.createCli, 'function')

    assert.ok(interbit.commonActions)
    assert.equal(typeof interbit.commonActions, 'object')

    assert.ok(interbit.createGenesisBlock)
    assert.equal(typeof interbit.createGenesisBlock, 'function')

    assert.ok(interbit.createDefaultSponsoredChainConfig)
    assert.equal(typeof interbit.createDefaultSponsoredChainConfig, 'function')

    assert.ok(interbit.genesisConfigBuilder)
    assert.equal(typeof interbit.genesisConfigBuilder, 'function')
  })

  describe('hypervisor', () => {
    it('has expected API', async () => {
      const hypervisor = await interbit.createHypervisor()
      console.log('hypervisor: ', hypervisor)

      try {
        assert.ok(hypervisor.dispatch)
        assert.equal(typeof hypervisor.dispatch, 'function')

        assert.ok(hypervisor.getState)
        assert.equal(typeof hypervisor.getState, 'function')

        assert.ok(hypervisor.subscribe)
        assert.equal(typeof hypervisor.subscribe, 'function')

        assert.ok(hypervisor.startHyperBlocker)
        assert.equal(typeof hypervisor.startHyperBlocker, 'function')

        assert.ok(hypervisor.stopHyperBlocker)
        assert.equal(typeof hypervisor.stopHyperBlocker, 'function')

        assert.ok(hypervisor.getCurrentBlock)
        assert.equal(typeof hypervisor.getCurrentBlock, 'function')

        assert.ok(hypervisor.setHeavyBlockInterval)
        assert.equal(typeof hypervisor.setHeavyBlockInterval, 'function')

        assert.ok(hypervisor.waitForState)
        assert.equal(typeof hypervisor.waitForState, 'function')

        assert.ok(hypervisor.chainId)
        assert.equal(typeof hypervisor.chainId, 'string')
      } finally {
        hypervisor.stopHyperBlocker()
      }
    })
  })

  describe('cli', () => {
    it('has expected API', async () => {
      const hypervisor = await interbit.createHypervisor()

      try {
        const cli = await interbit.createCli(hypervisor)
        console.log('cli: ', cli)

        assert.ok(cli.connect)
        assert.equal(typeof cli.connect, 'function')

        assert.ok(cli.createChain)
        assert.equal(typeof cli.createChain, 'function')

        assert.ok(cli.startChain)
        assert.equal(typeof cli.startChain, 'function')

        assert.ok(cli.loadChain)
        assert.equal(typeof cli.loadChain, 'function')

        assert.ok(cli.getChain)
        assert.equal(typeof cli.getChain, 'function')

        assert.ok(cli.removeChain)
        assert.equal(typeof cli.removeChain, 'function')

        assert.ok(cli.generateKeyPair)
        assert.equal(typeof cli.generateKeyPair, 'function')

        assert.ok(cli.getKeys)
        assert.equal(typeof cli.getKeys, 'function')

        assert.ok(cli.createGenesisBlock)
        assert.equal(typeof cli.createGenesisBlock, 'function')

        assert.ok(cli.getState)
        assert.equal(typeof cli.getState, 'function')

        assert.ok(cli.subscribe)
        assert.equal(typeof cli.subscribe, 'function')

        assert.ok(cli.kvPut)
        assert.equal(typeof cli.kvPut, 'function')

        assert.ok(cli.kvGet)
        assert.equal(typeof cli.kvGet, 'function')

        assert.ok(cli.sendChainToSponsor)
        assert.equal(typeof cli.sendChainToSponsor, 'function')

        assert.ok(cli.deployCovenant)
        assert.equal(typeof cli.deployCovenant, 'function')

        assert.ok(cli.applyCovenant)
        assert.equal(typeof cli.applyCovenant, 'function')

        assert.ok(cli.startServer)
        assert.equal(typeof cli.startServer, 'function')

        assert.ok(cli.stopServer)
        assert.equal(typeof cli.stopServer, 'function')
      } finally {
        hypervisor.stopHyperBlocker()
      }
    })
  })

  describe('chain', () => {
    it('has expected API', async () => {
      const hypervisor = await interbit.createHypervisor()

      try {
        const cli = await interbit.createCli(hypervisor)
        const chainId = await cli.createChain()
        const chain = await cli.getChain(chainId)
        console.log('chain: ', chain)

        assert.ok(chain.dispatch)
        assert.equal(typeof chain.dispatch, 'function')

        assert.ok(chain.getState)
        assert.equal(typeof chain.getState, 'function')

        assert.ok(chain.getCurrentBlock)
        assert.equal(typeof chain.getCurrentBlock, 'function')

        assert.ok(chain.subscribe)
        assert.equal(typeof chain.subscribe, 'function')

        assert.ok(chain.getActionPoolLength)
        assert.equal(typeof chain.getActionPoolLength, 'function')
      } finally {
        hypervisor.stopHyperBlocker()
      }
    }).timeout(5000)
  })
})
