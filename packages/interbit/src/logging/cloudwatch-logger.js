const aws = require('aws-sdk')

const Logger = require('./logger')

class CloudWatchLogger extends Logger {
  constructor({ group, stream }) {
    super()
    this.CloudWatchLogs = new aws.CloudWatchLogs({
      apiVersion: '2014-03-28'
    })
    this.logGroupName = group
    this.logStreamName = stream
    this.sequenceToken = null
  }

  async connect() {
    const streamParams = {
      logStreamName: this.logStreamName,
      logGroupName: this.logGroupName
    }

    return this.CloudWatchLogs.createLogStream(streamParams).promise()
  }

  async log(messageSet) {
    let messages = messageSet
    if (!Array.isArray(messageSet)) {
      messages = [messageSet]
    }

    const logEvents = messages.map(m => {
      console.log(m)
      return {
        message: JSON.stringify(m),
        timestamp: Date.now()
      }
    })

    const streamParams = {
      logEvents,
      sequenceToken: this.sequenceToken,
      logStreamName: this.logStreamName,
      logGroupName: this.logGroupName
    }

    const data = await this.CloudWatchLogs.putLogEvents(streamParams).promise()
    this.sequenceToken = data.nextSequenceToken
  }
}

module.exports = { CloudWatchLogger }
