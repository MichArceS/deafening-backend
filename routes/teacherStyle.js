const express = require('express')
const router = express.Router()
const teacherStyle = require('../controllers/teacherStyle.controller')
const authJwt = require('../middleware/authJwt')

router.get('/getAll', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacherStyle.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacherStyle.new)

router.post('/update', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacherStyle.update)

router.post('/disable', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacherStyle.disable)

module.exports = router
