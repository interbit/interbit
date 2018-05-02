const assert = require('assert')
const cheerio = require('cheerio')

const {
  updateDom,
  camelCaseToHyphenated
} = require('../src/chainManagement/updateIndexHtml')

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Interbit App</title>
</head>

<body>
<noscript>
You need to enable JavaScript to run this app.
</noscript>
<script src="/bundle.browser.js"
  id="interbit"
  data-chain-id-spoke1="044625fa3898cc55fc22243b329e3592040f87a607d0a104fc793fd522b099b7"
  data-chain-id-hub="323423h23g4234e2329e3592040f87a607d0a104fc793fd522b099b7"
  data-peer-hints="myapp.com,buffer.myapp.com,us-west.iws.interbit.io"
  data-boot-react-app="hub"
>
</script>
</body>
</html>`

describe('updateIndexHtml', () => {
  describe('camelCaseToHyphenated(s)', () => {
    it('does not muck up the app store', () => {
      const result = camelCaseToHyphenated('appStore')

      assert.equal(result, 'app-store')
    })
  })

  describe('updateDom(dom, appConfig, chains)', () => {
    it('adds chain id data', () => {
      const dom = cheerio.load(indexHtml)
      const appConfig = {
        chains: ['meow'],
        peers: []
      }
      const chains = {
        meow: '123456789'
      }

      updateDom(dom, appConfig, chains)

      assert.equal(dom('#interbit').attr('data-chain-id-meow'), chains.meow)
    })

    it('strips old chain id data', () => {
      const dom = cheerio.load(indexHtml)
      const appConfig = {
        chains: [],
        peers: []
      }
      const chains = []

      updateDom(dom, appConfig, chains)

      assert.equal(dom('#interbit').data('chain-id-spoke1'), undefined)
      assert.equal(dom('#interbit').data('chain-id-hub'), undefined)
    })

    it('includes peer hints', () => {
      const dom = cheerio.load(indexHtml)
      const peers = ['192.0.0.1', '8.8.8.8']
      const appConfig = {
        chains: [],
        peers
      }
      const chains = []

      updateDom(dom, appConfig, chains)

      assert.equal(dom('#interbit').data('peer-hints'), peers.toString())
    })

    it('updates dom under normal operating conditions', () => {
      const dom = cheerio.load(indexHtml)
      const peers = []
      const appConfig = {
        peers: [],
        chains: ['public'],
        appChain: 'public',
        indexLocation:
          '/home/btl/Documents/Repositories/integration/packages/template/public/index.html',
        buildLocation:
          '/home/btl/Documents/Repositories/integration/packages/template/build/'
      }
      const chains = {
        public:
          '1a1d126c3121c65d0c8e91f5ba1e8c0f8df4416b7228b0d2143522b2262dac8b',
        control:
          'ea36311631faf66691c1e55ac7108843eab80ef79ebcfc4ed5bcf241ba33bcb3'
      }

      updateDom(dom, appConfig, chains)

      assert.equal(dom('#interbit').data('chain-id-public'), chains.public)
      assert.equal(dom('#interbit').data('peer-hints'), peers.toString())
    })
  })
})
