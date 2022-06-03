const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth.controller')
const authJwt = require('../middleware/authJwt')

router.post('/signup',
/*[
  authJwt.verifyToken,
  authJwt.isAdmin,
  ],*/
  auth.signup)

router.post('/signin', auth.signin)

router.post('/signinAdmin', [authJwt.isAdminByEmail],
  auth.signin)

router.post('/signinAssistant', [authJwt.isAssistantByEmail],
  auth.signin)

module.exports = router
