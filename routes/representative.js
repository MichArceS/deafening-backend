const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const representative = require('../controllers/representative.controller')

router.get('/getAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    representative.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin],
    representative.new)

router.post('/update', 
    [authJwt.verifyToken, authJwt.isAdmin],
    representative.update)

router.post('/disable',
    [authJwt.verifyToken, authJwt.isAdmin],
    representative.disable)

router.get('/getByDocument',
    [authJwt.verifyToken, authJwt.isAdmin],
    representative.getByID)

module.exports = router
