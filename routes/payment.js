const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const payment = require('../controllers/payment.controller')

router.get('/getAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    payment.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin],
    payment.new)

router.post('/update',
    [authJwt.verifyToken, authJwt.isAdmin],
    payment.update)

router.post('/disable',
    [authJwt.verifyToken, authJwt.isAdmin], 
    payment.disable)

module.exports = router
