const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.User

verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      })
    }
    req.userId = decoded.id
    next()
  })
}

isAssistant = (req, res, next) => {
  try {
    User.findOne({
      where: {
        id: req.userId,
        rol: 'ASSISTANT',
        state: 'A'
      }
    }).then(obs => {
      if (!obs) {
        res.status(403).send({
          message: 'Require Observer Role!'
        })
      }
      next()
      return
    }).catch(err => { res.status(400).send({ message: err.message }) })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

isAdmin = (req, res, next) => {
  try {
    User.findOne({
      where: {
        id: req.userId,
        rol: 'ADMIN',
        state: 'A'
      }
    }).then(user => {
      if (user) {
        next()
        return
      }
      res.status(403).send({
        message: 'Require Admin Role!'
      })
    }).catch(err => { res.status(400).send({ message: err.message }) })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

isAssistantByEmail = (req, res, next) => {
  try {
    const e = req.body.correo
    User.findOne({
      where: {
        correo: e,
        rol: 'ASSISTANT',
        state: 'A'
      }
    }).then(user => {
      if (user) {
        req.userId = user.id
        next()
        return
      }
      res.status(403).send({
        message: 'Require Assistant Role!'
      })
    }).catch(err => { res.status(400).send({ message: err.message }) })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

isAdminByEmail = (req, res, next) => {
  try {
    const e = req.body.correo
    User.findOne({
      where: {
        correo: e,
        rol: 'ADMIN',
        state: 'A'
      }
    }).then(user => {
      if (user) {
        req.userId = user.id
        next()
        return
      }
      res.status(403).send({
        message: 'Require Admin Role!'
      })
    }).catch(err => { res.status(400).send({ message: err.message }) })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isAssistant: isAssistant,
  isAssistantByEmail: isAssistantByEmail,
  isAdminByEmail: isAdminByEmail
}
module.exports = authJwt
