const express = require('express')
const router = express.Router()
const pack = require('../controllers/pack.controller')

router.get('/getAll', pack.getAll)

router.post('/new', pack.new)

router.post('/update', pack.update)

router.post('/disable', pack.disable)

module.exports = router
