const path = require('path')

module.exports = {
  peers: [],
  staticChains: {
    covenant: 'covenant'
  },
  covenants: {
    covenant: {
      location: path.join(__dirname, 'covenant')
    }
  }
}
