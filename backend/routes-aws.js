const package = require('./package.json')

const express = require('express')
const router = express.Router()

const projectsNew = require('./actions/projects/new')

router.all('/', (_, res) => res.json({
  status: 'ok',
  message: `API version ${package.version}`
}))

router.post('/projects/new', ({ body: { url, origin, framework } }, res) => 
  projectsNew({ url, origin, framework })
    .then(() => res.json({ status: 'ok' }))
    .catch((err) => res.status(500).json({ status: 'error', message: err }))
)

module.exports = router
