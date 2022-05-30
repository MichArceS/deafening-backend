const express = require('express')
const router = express.Router()
const schedule = require('../controllers/schedule.controller')

router.get('/getAll', schedule.getAll)

router.post('/new', schedule.new)

router.post('/update', schedule.update)

router.post('/disable', schedule.disable)

module.exports = router
