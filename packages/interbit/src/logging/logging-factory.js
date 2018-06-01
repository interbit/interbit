const { CloudWatchLogger } = require('./cloudwatch-logger')
const { ConsoleLogger } = require('./console-logger')

export const loggingFactory = ({ format, group, name }) => {
  switch (format) {
    case 'cloudwatch':
      return new CloudWatchLogger({ group, name })
    case 'console':
      return new ConsoleLogger({ group, name })
    default:
      throw new Error('Unknown Logger')
  }
}
