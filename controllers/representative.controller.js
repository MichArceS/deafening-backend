
const representante = require('../models').Representative
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getAll = async function (req, res, next) {
    try {
        await representante.findAll({
            where: {
                state: 'A'
            }
        })
            .then(representantes => {
                res.json(representantes)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await representante.create({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                convencional: req.body.convencional,
                telefono_1: req.body.telefono_1,
                telefono_2: req.body.telefono_2,
                fecha_nacimiento: req.body.fecha_nacimiento,
                direccion: req.body.direccion,
            }, { transaction: t }).then(async (assis) => {
                res.status(200).send({ message: 'Succesfully created' })
            })
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.update = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            const p = await representante.update({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                convencional: req.body.convencional,
                telefono_1: req.body.telefono_1,
                telefono_2: req.body.telefono_2,
                fecha_nacimiento: req.body.fecha_nacimiento,
                direccion: req.body.direccion,
                audUpdatedAt: Date.now()
            }, {
                where: { id: parseInt(req.body.id, 10) }
            }, { transaction: t })
            res.status(200).send({ message: 'Succesfully updated' })
        })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.disable = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            const p = await representante.update({
                state: 'I',
                audDeletedAt: Date.now()
            }, {
                where: { id: parseInt(req.body.id, 10) }
            }, { transaction: t })
            return p
        }).catch(err => res.status(419).send({ message: err.message }))
        res.status(200).send({ message: 'Succesfully updated' })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}
