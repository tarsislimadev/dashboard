const package = require('./package.json')
const amqp = require('amqplib/callback_api')
const express = require('express')
const router = express.Router()

const queue = 'create-docker-image'

const rabbitQueue = new Promise((s, f) => {
  amqp.connect('amqp://queues', function (error0, connection) {
    if (error0) { return f(error0) }

    connection.createChannel((error1, channel) => {
      if (error1) { return f(error1) }

      channel.assertQueue(queue, { durable: false })
      s((text) => channel.sendToQueue(queue, Buffer.from(text)))
    })
  })
})

router.all('/', (_, res) => res.json({
  status: 'ok',
  message: `API version ${package.version}`
}))

router.post('/projects/new', ({ body: { url, origin, framework } }, res) => {
  const queueMessage = JSON.stringify({ url, origin, framework })
  rabbitQueue.then((sendQueueMessage) => sendQueueMessage(queueMessage))
    .then(() => res.json({ status: 'ok' }))
    .catch((err) => res.status(500).json({ status: 'error', message: err }))
})

module.exports = router
