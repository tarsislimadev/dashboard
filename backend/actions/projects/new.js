const config = require('../../config')

const aws = require('aws-sdk')
const sqs = new aws.SQS(config.sqs)
sqs.config.update(config.aws)

module.exports = (queueParams) => {
  sqs.createQueue(
    { QueueName: 'MyQueue' },
    (err) => {
      if (err) throw err

      const text = JSON.stringify(queueParams)
      console.log('message', text)
      sqs.sendMessage({ MessageBody: text })
    }
  )
}
