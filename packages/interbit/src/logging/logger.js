/* eslint-disable class-methods-use-this */
class Logger {
  constructor() {
    if (this.constructor === Logger) {
      throw new Error('Abstract Logger cannot be instantiated.')
    }
  }
  async connect() {
    throw new Error('Connect must be implemented by the logger')
  }

  async log(messageSet) {
    throw new Error('Log must be implemented by the logger')
  }
}
/* eslint-enable class-methods-use-this */

module.exports = { Logger }
