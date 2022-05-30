const express = require('express')
const router = express.Router()
const packRegister = require('../controllers/packRegister.controller')

router.get('/getAll', packRegister.getAll)

router.post('/new', packRegister.new)

router.post('/update', packRegister.update)

router.post('/disable', packRegister.disable)

module.exports = router
