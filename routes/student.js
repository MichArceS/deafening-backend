const express = require('express')
const router = express.Router()
const student = require('../controllers/student.controller')

router.get('/getAll', student.getAll)

router.post('/new', student.new)

router.post('/update', student.update)

router.post('/disable', student.disable)

module.exports = router
