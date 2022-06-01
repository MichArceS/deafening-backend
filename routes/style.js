const express = require('express')
const router = express.Router()
const style = require('../controllers/style.controller')
const authJwt = require('../middleware/authJwt')

router.get('/getAll', 
    [authJwt.verifyToken, authJwt.isAdmin],
    style.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin],
    style.new)

router.post('/update', 
    [authJwt.verifyToken, authJwt.isAdmin],
    style.update)

router.post('/disable', 
    [authJwt.verifyToken, authJwt.isAdmin],
    style.disable)

module.exports = router
