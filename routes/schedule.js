const express = require('express')
const router = express.Router()
const schedule = require('../controllers/schedule.controller')
const authJwt = require('../middleware/authJwt')

router.get('/getAll', 
    [authJwt.verifyToken, authJwt.isAdmin],
    schedule.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin],
    schedule.new)

router.post('/update', 
    [authJwt.verifyToken, authJwt.isAdmin],
    schedule.update)

router.post('/disable', 
    [authJwt.verifyToken, authJwt.isAdmin],
    schedule.disable)

module.exports = router
