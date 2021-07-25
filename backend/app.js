const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/v1', require('./routes-aws'))

app.use((_, req) => req.status(404).json({ status: 'error', message: 'not found' }))

module.exports = app
