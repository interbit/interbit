const path = require('path')

const PUBLIC_KEY =
  '-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n'

const config = {
  peers: ['localhost:5025'],
  adminValidators: [PUBLIC_KEY],
  staticChains: {
    incrementerPublic: {
      covenant: 'incrementer-public',
      config: {
        validators: [PUBLIC_KEY]
      }
    }
  },
  covenants: {
    'incrementer-public': {
      location: path.join(__dirname, 'src/interbit/public')
    }
  },
  apps: {
    increment: {
      peers: ['localhost:5000'], // the peers the browser should connect to
      chains: ['incrementerPublic'],
      appChain: 'incrementerPublic',
      indexLocation: path.join(__dirname, 'public/index.html'),
      buildLocation: path.join(__dirname, 'build/')
    }
  }
}

module.exports = config
