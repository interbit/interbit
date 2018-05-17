import paths from './paths'

export default {
  headerNav: [
    {
      text: 'Public Chain',
      to: paths.CHAINS,
      eventKey: 'chains'
    },
    {
      text: 'Block Explorer',
      to: paths.BLOCK_EXPLORER,
      eventKey: 'explore'
    }
  ]
}
