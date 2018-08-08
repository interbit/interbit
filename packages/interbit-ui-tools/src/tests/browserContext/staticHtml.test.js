/**
 * @jest-environment jsdom
 */
const assert = require('assert')
const { jsdom } = require('jsdom')

const getHtmlConfig = require('../../middleware/browserContext/staticHtml')

const chainIdPublic = '323423h23g4234e2329e3592040f87a60...'
const chainIdGithubOauth = '044625fa3898cc55fc22243b329e35920...'
const peer1 = 'myapp.com'
const peer2 = 'buffer.myapp.com'
const peer3 = 'us-west.iws.interbit.io'
const appName = 'myApp'

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
  data-chain-id-public="${chainIdPublic}"
  data-chain-id-github-oauth="${chainIdGithubOauth}"
  data-peer-hints="${peer1},${peer2},${peer3}"
  data-boot-react-app="${appName}"
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
            chainId: chainIdPublic,
            status: 'PENDING'
          },
          githubOauth: {
            chainId: chainIdGithubOauth,
            status: 'PENDING'
          }
        },
        peers: [peer1, peer2, peer3],
        bootReactApp: appName
      })
    })
  })
})
