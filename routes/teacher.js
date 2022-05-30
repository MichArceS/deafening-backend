const express = require('express')
const router = express.Router()
const teacher = require('../controllers/teacher.controller')

router.get('/getAll', teacher.getAll)

router.post('/new', teacher.new)

router.post('/update', teacher.update)

router.post('/disable', teacher.disable)

module.exports = router
