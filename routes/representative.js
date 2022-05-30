const express = require('express')
const router = express.Router()
const representative = require('../controllers/representative.controller')

router.get('/getAll', representative.getAll)

router.post('/new', representative.new)

router.post('/update', representative.update)

router.post('/disable', representative.disable)

module.exports = router
