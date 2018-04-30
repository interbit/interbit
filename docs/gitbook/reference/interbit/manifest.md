# The Interbit Manifest File

The Interbit manifest file is a set of declarations about how a network will be deployed that is generated automatically by the [build](build.md) step based on a [configuration file](config.md).

It is a JSON file and should not be altered manually.

It contains similar information about the network as the configuration file, except that is not variable. All variables have been resolved. Chain configurations become genesis blocks and chain IDs, and covenant file locations become packed covenant hashes.

## Example

Although you should never manually edit a manifest, here is an example of what a manifest file could look like.

```json
{
  "peers": ["localhost:8888"],
  "apps": {
    "template": {
      "peers": ["localhost"],
      "appChain": "templatePublic",
      "buildLocation": "../build",
      "browserChains": [
        "templatePublic"
      ]
    }
  },
  "covenants": {
    "template-public": {
      "hash": "dfdeefe6b1988c799f8356573795e9c483a2456612287cabf2d6af37b8f1dd06",
      "filename": "covenants/dfdeefe6b1988c799f8356573795e9c483a2456612287cabf2d6af37b8f1dd06.tgz"
    },
    "template-control": {
      "hash": "73aaa7a0529d9860aacda7d2a14707d4a323b4256adcbfcad2986385dc3a9d6d",
      "filename": "covenants/73aaa7a0529d9860aacda7d2a14707d4a323b4256adcbfcad2986385dc3a9d6d.tgz"
    },
    "template-private": {
      "hash": "15835bbd1463be07868edee205391142459ef64869b4aeb123e5843f5bd45bbb",
      "filename": "covenants/15835bbd1463be07868edee205391142459ef64869b4aeb123e5843f5bd45bbb.tgz"
    }
  },
  "chains": {
    "templatePublic": "b3f65aad1c177a763bb1886506f20883819da59701b0ff4b8862b3bee709567d",
    "templateControl": "4eaeeec6559441709c2669377174c25b77567adcbe0f489f10436b800c5d76d7",
    "interbitRoot": "4ba036f09cd4f1244ab4b9657f79b4df56debfd8302208f6b6ca4e7c48cef2c7"
  },
  "genesisBlocks": {
    "templatePublic": {
      "content": {
        "previousHash": "genesis",
        "stateHash": "cf4a4db0ba7c7c1a67cc42ddba18859b8117bea26d4011ae708ce9a42f79a78e",
        "actions": [],
        "errors": {},
        "redispatches": {},
        "height": 0,
        "timestamp": 1524680187503,
        "seed": 0.33029621606956616,
        "configChanged": true,
        "timeToCreateBlock": 0,
        "state": {
          "interbit": {
            "config": {
              "consensus": "PoA",
              "providing": [],
              "consuming": [],
              "acl": {
                "actionPermissions": {
                  "*": [
                    "root"
                  ]
                },
                "roles": {
                  "root": [
                    "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
                  ]
                }
              },
              "blockMaster": "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
            },
            "configChanges": {}
          }
        }
      },
      "contentHash": "3b2540d38009aa5d862d79d9b2ab5ee5fa6e61c4c62432277f6c66ae27c58071",
      "signatures": {
        "GENESIS": "GENESIS"
      },
      "signaturesHash": "5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce",
      "blockHash": "b3f65aad1c177a763bb1886506f20883819da59701b0ff4b8862b3bee709567d"
    },
    "templateControl": {
      "content": {
        "previousHash": "genesis",
        "stateHash": "cf4a4db0ba7c7c1a67cc42ddba18859b8117bea26d4011ae708ce9a42f79a78e",
        "actions": [],
        "errors": {},
        "redispatches": {},
        "height": 0,
        "timestamp": 1524680187504,
        "seed": 0.9479854523590585,
        "configChanged": true,
        "timeToCreateBlock": 0,
        "state": {
          "interbit": {
            "config": {
              "consensus": "PoA",
              "providing": [],
              "consuming": [],
              "acl": {
                "actionPermissions": {
                  "*": [
                    "root"
                  ]
                },
                "roles": {
                  "root": [
                    "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
                  ]
                }
              },
              "blockMaster": "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
            },
            "configChanges": {}
          }
        }
      },
      "contentHash": "b5d8ca40c2dba15a3aaad78dc6532d6194385a2a3b4f54bfd266034b45573b25",
      "signatures": {
        "GENESIS": "GENESIS"
      },
      "signaturesHash": "5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce",
      "blockHash": "4eaeeec6559441709c2669377174c25b77567adcbe0f489f10436b800c5d76d7"
    },
    "interbitRoot": {
      "content": {
        "previousHash": "genesis",
        "stateHash": "cf4a4db0ba7c7c1a67cc42ddba18859b8117bea26d4011ae708ce9a42f79a78e",
        "actions": [],
        "errors": {},
        "redispatches": {},
        "height": 0,
        "timestamp": 1524680187505,
        "seed": 0.5562999345175059,
        "configChanged": true,
        "timeToCreateBlock": 0,
        "state": {
          "interbit": {
            "config": {
              "consensus": "PoA",
              "providing": [],
              "consuming": [],
              "acl": {
                "actionPermissions": {
                  "*": [
                    "root"
                  ]
                },
                "roles": {
                  "root": [
                    "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
                  ]
                }
              },
              "blockMaster": "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
            },
            "configChanges": {}
          }
        }
      },
      "contentHash": "0717649d0fef956de7b0646bbc044f861f0a26ce3afde2abd40fad8013f5fc9f",
      "signatures": {
        "GENESIS": "GENESIS"
      },
      "signaturesHash": "5802612e380de8f088c9c9ab28412e853d75d86eed65d8415bca52daac7681ce",
      "blockHash": "4ba036f09cd4f1244ab4b9657f79b4df56debfd8302208f6b6ca4e7c48cef2c7"
    }
  },
  "manifest": {
    "interbitRoot": {
      "chainId": "4ba036f09cd4f1244ab4b9657f79b4df56debfd8302208f6b6ca4e7c48cef2c7",
      "validators": [
        "-----BEGIN PGP PUBLIC KEY BLOCK-----\r\nVersion: OpenPGP.js v2.6.2\r\nComment: https://openpgpjs.org\r\n\r\nxk0EWtpPiAEB/1DUOOu08SW7IGGlw5AavcxUxtrJbJVliIcFNSTpn/z/p0Zi\nIfO58AK0dfcHyMb1vUY8zwM45if6iaNS98zF3lEAEQEAAc0NPGluZm9AYnRs\nLmNvPsJ1BBABCAApBQJa2k+IBgsJBwgDAgkQjFLIxmtXVSMEFQgKAgMWAgEC\nGQECGwMCHgEAAIdvAf0SbWcBMphrR7wc6rL5ytyThLBsI72vz/0QyBcaRlsp\nQ9US66w6f+OWcpAiOeLDdx9l39difSXpjL9yYWxWRElSzk0EWtpPiAECAOpL\nfIIdC5S/lIaWI+Bx23FtSdxyqrKduDQCRDhB07udTv4bjGCSCtpyPS3Y03m6\nyl/GAa7OLIFeLzI4tzT0CXMAEQEAAcJfBBgBCAATBQJa2k+ICRCMUsjGa1dV\nIwIbDAAAxXwB/RUA88XTd6vDJDFeRx4/Escv5tyQuT9bxMkmSxaqiBRTU2X5\nhrFQs5NGOu2ySGbRvZMopK91sLK/uqlTaty1oVk=\r\n=yws5\r\n-----END PGP PUBLIC KEY BLOCK-----\r\n\r\n"
      ],
      "covenants": {},
      "chains": {
        "templatePublic": {
          "joins": {
            "consume": [
              {
                "alias": "templateControl",
                "path": [
                  "interbitServices"
                ],
                "joinName": "INTERBIT_SERVICES"
              },
              {
                "alias": "templateControl",
                "path": [
                  "privateChainHosting"
                ],
                "joinName": "HOSTING_SPONSOR"
              }
            ]
          },
          "covenant": "template-public"
        },
        "templateControl": {
          "joins": {
            "provide": [
              {
                "alias": "templatePublic",
                "path": [
                  "interbitServices",
                  "shared"
                ],
                "joinName": "INTERBIT_SERVICES"
              },
              {
                "alias": "templatePublic",
                "path": [
                  "privateChainHosting",
                  "shared"
                ],
                "joinName": "HOSTING_SPONSOR"
              }
            ]
          },
          "covenant": "template-control"
        }
      }
    }
  }
}
```
