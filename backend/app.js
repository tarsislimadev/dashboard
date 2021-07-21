const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/v1', require('./routes'))

app.use((_, req) => req.status(404).json({ status: 'error', message: 'not found' }))

module.exports = app
