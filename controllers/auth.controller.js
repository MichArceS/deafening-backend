const db = require('../models')
const config = require('../config/auth.config')
const User = db.User

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.signin = (req, res) => {
  User.findOne({
    where: {
      correo: req.body.correo,
      state: 'A'
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password.toString(), user.password)
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: 'Invalid Password!'
      })
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: '365d' // 365 dias
    })

    const userRole = user.rol.toUpperCase()
    var json = {
      id: user.id,
      correo: user.correo,
      nombre: user.nombre,
      token: token
    }

    if (userRole == 'ASSISTANT') {
      json["rol"] = 'ASSISTANT'
      res.status(200).send(json)
    }
    else if (userRole == 'ADMIN') {
      res.status(200).send(json)
    }
  })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
}

exports.signup = async (req, res) => {
  var u = await User.findOne({
    where: { correo: req.body.correo },
    attributes: ['id']
  })
  if (u) {
    res.status(418).send({ message: "User already exists" })
    return
  }
  else {
    await User.create({
      correo: req.body.correo,
      password: bcrypt.hashSync(req.body.password, 8),
      nombre: req.body.nombre,
      state: 'A',
      rol: req.body.rol
    })
      .then(user => {
        res.send({ message: 'User was registered without role successfully!' })
          return
      })
      .catch(err => {
        res.status(500).send({ message: err.message })
      })
  }
}