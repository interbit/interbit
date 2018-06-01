import { Logger } from './logger'

/* eslint-disable class-methods-use-this */
class ConsoleLogger extends Logger {
  async connect() {
    console.log('Console Logger online')
    return Promise.resolve()
  }

  async log(messageSet = []) {
    for (const message of messageSet) {
      console.log(`[${this.group}][${this.stream}] ${message}`)
    }
    return Promise.resolve()
  }
}
/* eslint-enable class-methods-use-this */

module.exports = { ConsoleLogger }
