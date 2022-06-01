const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const pack = require('../controllers/pack.controller')

router.get('/getAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    pack.getAll)

router.post('/new',
    [authJwt.verifyToken, authJwt.isAdmin],
     pack.new)

router.post('/update',
    [authJwt.verifyToken, authJwt.isAdmin],
    pack.update)

router.post('/disable',
    [authJwt.verifyToken, authJwt.isAdmin],
    pack.disable)

module.exports = router
