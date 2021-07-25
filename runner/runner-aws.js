// const fs = require('fs')
// const path = require('path')
const config = require('./config')

const aws = require('aws-sdk')
const sqs = new aws.SQS(config.sqs)
sqs.config.update(config.aws)

sqs.receiveMessage({
  QueueUrl: config.sqs.endpoint + '/000000000000/MyQueue',
}, function (...params) {
  console.log('sqs.receiveMessage', ...params)

  // if (data.Messages) {
  //   const msg = data.Messages[data.Messages.length - 1]
  //   console.log('received message', msg)

  //   const { url, origin, framework } = JSON.parse(msg.toString())
  //   const dateString = Date.now().toString()

  //   console.log(`${dateString} -- build docker image from ${origin} with url ${url} and framework ${framework} `)

  //   const tagname = [framework, origin, dateString].join('-')
  //   const dir = path.resolve('.', 'images', tagname)

  //   fs.mkdirSync(dir)
  //   fs.writeFileSync(path.resolve(dir, 'Dockerfile'), content.replace('##GIT##', url))

  //   const runner = spawn('docker', ['build', '-t', tagname, dir])
  //   runner.stdout.on('data', (data) => fs.appendFileSync(path.resolve(dir, 'out.txt'), data.toString()))
  //   runner.stderr.on('data', (data) => fs.appendFileSync(path.resolve(dir, 'err.txt'), data.toString()))
  //   runner.on('close', (code) => console.log(`${tagname} - child process exited with code ${code}`))
  // }
})
