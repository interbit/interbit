const Immutable = require('seamless-immutable')
// const hashObject = require('object-hash')
const { PATHS } = require('./constants')

const prefix = '@@MANIFEST'

const actionTypes = {
  // Update basic account details about the owner of these projects
  SET_MANIFEST: `${prefix}/SET_MANIFEST`
}

const actionCreators = {
  setManifest: manifest => ({
    type: actionTypes.SET_MANIFEST,
    payload: {
      manifest
    }
  })
}

/*
 State shape
{
  // manifest must be fully resolved
  // contains all chains that are defined statically in the molecule/configuration
  // Joins need to go in here too
  manifest: {
    root: {
      chainId: chn_6547,
      manifestHash: 'mft_1234'
    },
    validatorPool: [
      pubkey1,
      pubkey2
    ],
    covenants: {
      root: cov_000,
      public: cov_123,
      private: cov_456,
      control: cov_789,
      oAuth: cov_412
    },
    chains: {
      public: {
        chainId: chn_18723,
        covenant: public,
        acl: []
      },
      control: {
        // If a chain id is provided, chain must exist
        chainId: chn_98123,
        covenant: control,
        acl: [],
        manifest: {
          covenants: {
            oAuth: cov_412,
            private: cov_456
          },
          chains: {
            githubOauth: {
              // If a genesis block is provided, chain can be created
              // with a known chainId, or refer to an existing chain
              // with the chainId corresponding to the hash of the genesis block
              genesis: {...},
              covenant: oAuth,
              acl: []
            }
          },
          manifestHash: 'mft_7634'
        }
      }
    },
    manifestHash: 'mft_1234'
  }
*/

const initialState = Immutable.from({}).setIn(PATHS.MANIFEST, {})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MANIFEST: {
      const { manifest } = action.payload
      // TODO: Probably don't do this. Use the individual methods instead.
      // TODO (OR): Check this config with the previous version and apply changes
      return state.setIn(PATHS.MANIFEST, manifest)
    }

    default:
      return state
  }
}

module.exports = {
  actionTypes,
  actionCreators,
  initialState,
  reducer
}
