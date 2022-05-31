const express = require('express')
const router = express.Router()
const packRegister = require('../controllers/packRegister.controller')

router.get('/getAll', 
    [authJwt.verifyToken, authJwt.isAdmin],
    packRegister.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin],
    packRegister.new)

router.post('/update',
    [authJwt.verifyToken, authJwt.isAdmin],
    packRegister.update)

router.post('/disable', 
    [authJwt.verifyToken, authJwt.isAdmin],
    packRegister.disable)

module.exports = router
