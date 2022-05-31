const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const lesson = require('../controllers/lesson.controller')

router.get('/getAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    lesson.getAll)

router.post('/new', 
    [authJwt.verifyToken, authJwt.isAdmin], 
    lesson.new)

router.post('/update',
    [authJwt.verifyToken, authJwt.isAdmin],
    lesson.update)

router.post('/disable',
    [authJwt.verifyToken, authJwt.isAdmin],
    lesson.disable)

router.get('/getByUserID',
    [authJwt.verifyToken, authJwt.isAssistant],
    lesson.getByUserID)

module.exports = router
