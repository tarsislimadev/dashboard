const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const amqp = require('amqplib/callback_api')

const queue = 'create-docker-image'

const env = {
  rabbitURL: process.env.RABBITMQ || 'queues'
}

const rabbitChannel = new Promise((s, f) => {
  amqp.connect('amqp://' + env.rabbitURL, (error0, conn) => {
    error0 ? f(error0) : (conn.createChannel((error1, channel) => {
      error1 ? f(error1) : s(channel)
    }))
  })
})

const content = `
FROM tmvdl/git:latest as download
WORKDIR /app
RUN git clone ##GIT## .

FROM tmvdl/node as build
WORKDIR /app
COPY --from=download /app .
RUN npm ci
RUN npm run ng build --prod
RUN mv $( dirname $(find dist -name index.html) ) /build

FROM nginx:alpine
COPY --from=build /build /usr/share/nginx/html
`

console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue)

rabbitChannel.then(channel => {
  channel.assertQueue(queue, { durable: false })
  channel.consume(queue, function (msg) {
    const { url, origin, framework } = JSON.parse(msg.content.toString())
    const dateString = Date.now().toString();

    console.log(`${dateString} -- build docker image from ${origin} with url ${url} and framework ${framework} `)

    const tagname = [framework, origin, dateString].join('-')
    const dir = path.resolve('.', 'images', tagname)

    fs.mkdirSync(dir)
    fs.writeFileSync(path.resolve(dir, 'Dockerfile'), content.replace('##GIT##', url))

    const runner = spawn('docker', ['build', '-t', tagname, dir])
    runner.stdout.on('data', (data) => fs.appendFileSync(path.resolve(dir, 'out.txt'), data.toString()))
    runner.stderr.on('data', (data) => fs.appendFileSync(path.resolve(dir, 'err.txt'), data.toString()))
    runner.on('close', (code) => console.log(`${tagname} - child process exited with code ${code}`))
  })
})
