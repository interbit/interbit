import paths from './paths'

export default {
  headerNav: [
    {
      text: 'Private Chain',
      to: paths.CHAINS,
      eventKey: 'chains'
    },
    {
      text: 'Block Explorer',
      to: paths.BLOCK_EXPLORER,
      eventKey: 'explore'
    },
    {
      text: 'Connect to Profile',
      to: paths.CAUTH_REQUEST,
      eventKey: 'cauthRequest'
    }
  ]
}
