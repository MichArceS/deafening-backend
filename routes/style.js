const express = require('express')
const router = express.Router()
const style = require('../controllers/style.controller')

router.get('/getAll', style.getAll)

router.post('/new', style.new)

router.post('/update', style.update)

router.post('/disable', style.disable)

module.exports = router
