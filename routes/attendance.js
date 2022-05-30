const express = require('express')
const router = express.Router()
const attendance = require('../controllers/attendance.controller')

router.get('/getAll', attendance.getAll)

router.post('/new', attendance.new)

router.post('/update', attendance.update)

router.post('/disable', attendance.disable)

module.exports = router
