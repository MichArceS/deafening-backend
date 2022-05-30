const express = require('express')
const router = express.Router()
const payment = require('../controllers/payment.controller')

router.get('/getAll', payment.getAll)

router.post('/new', payment.new)

router.post('/update', payment.update)

router.post('/disable', payment.disable)

module.exports = router
