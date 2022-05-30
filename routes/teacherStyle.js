const express = require('express')
const router = express.Router()
const teacherStyle = require('../controllers/teacherStyle.controller')

router.get('/getAll', teacherStyle.getAll)

router.post('/new', teacherStyle.new)

router.post('/update', teacherStyle.update)

router.post('/disable', teacherStyle.disable)

module.exports = router
