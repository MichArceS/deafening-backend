const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const attendance = require('../controllers/attendance.controller')

router.get('/getByID',
    [authJwt.verifyToken, authJwt.isAdmin],
    attendance.getByID)

router.get('/getAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    attendance.getAll)

router.post('/new',
    [authJwt.verifyToken, authJwt.isAssistant],
    attendance.new)

router.post('/update',
    [authJwt.verifyToken, authJwt.isAdmin],
    attendance.update)

router.post('/disable',
    [authJwt.verifyToken, authJwt.isAdmin],
     attendance.disable)

module.exports = router
