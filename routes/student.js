const express = require('express')
const router = express.Router()
const authJwt = require('../middleware/authJwt')
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })
const student = require('../controllers/student.controller')

router.get('/getAll',
    [authJwt.verifyToken, authJwt.isAdmin],
    student.getAll)

router.post('/new',
    upload.single('file'),
    [authJwt.verifyToken, authJwt.isAdmin],
    student.new)

router.post('/update',
    [authJwt.verifyToken, authJwt.isAdmin],
    student.update)

router.post('/disable',
    [authJwt.verifyToken, authJwt.isAdmin],
    student.disable)

router.get('/getByDocument',
    [authJwt.verifyToken, authJwt.isAssistant],
    student.getByID)

module.exports = router
