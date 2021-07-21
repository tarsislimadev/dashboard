const express = require('express')
const router = express.Router()

const package = require('./package.json')

router.all('/', (_, res) => res.json({ status: 'ok', message: `API version ${package.version}` }))

module.exports = router
