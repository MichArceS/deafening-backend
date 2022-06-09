const express = require('express')
const router = express.Router()
const teacher = require('../controllers/teacher.controller')
const authJwt = require('../middleware/authJwt')

router.get('/getByID',
    [authJwt.verifyToken, authJwt.isAdmin],
    teacher.getByID)

router.get('/getAll', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacher.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacher.new)

router.post('/update', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacher.update)

router.post('/disable', 
    [authJwt.verifyToken, authJwt.isAdmin],
    teacher.disable)

module.exports = router
