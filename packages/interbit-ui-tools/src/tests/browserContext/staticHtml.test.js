/**
 * @jest-environment jsdom
 */
const assert = require('assert')
const { jsdom } = require('jsdom')

const getHtmlConfig = require('../../middleware/browserContext/staticHtml')

const CHAIN_ID_PUBLIC = '323423h23g4234e2329e3592040f87a60...'
const CHAIN_ID_GITHUB_OAUTH = '044625fa3898cc55fc22243b329e35920...'
const PEER1 = 'myapp.com'
const PEER2 = 'buffer.myapp.com'
const PEER3 = 'us-west.iws.interbit.io'
const APP_NAME = 'myApp'

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
  data-chain-id-public="${CHAIN_ID_PUBLIC}"
  data-chain-id-github-oauth="${CHAIN_ID_GITHUB_OAUTH}"
  data-peer-hints="${PEER1},${PEER2},${PEER3}"
  data-boot-react-app="${APP_NAME}"
>
</script>
</body>
</html>`

describe('staticHtml', () => {
  describe('getHtmlConfig(document)', () => {
    it('Reads the expected configuration from static HTML', () => {
      const document = jsdom(indexHtml)
      const config = getHtmlConfig(document)
      assert.deepStrictEqual(config, {
        chainData: {
          public: {
            chainId: CHAIN_ID_PUBLIC,
            status: 'PENDING'
          },
          githubOauth: {
            chainId: CHAIN_ID_GITHUB_OAUTH,
            status: 'PENDING'
          }
        },
        peers: [PEER1, PEER2, PEER3],
        bootReactApp: APP_NAME
      })
    })
  })
})
