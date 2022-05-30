
const estudiante = require('../models').Student
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getAll = async function (req, res, next) {
    try {
        await estudiante.findAll({
            where: {
                state: 'A'
            }
        })
            .then(estudiantes => {
                res.json(estudiantes)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await estudiante.create({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                convencional: req.body.convencional,
                telefono: req.body.telefono,
                telefono_emergencia: req.body.telefono_emergencia,
                alergias: req.body.alergias,
                direccion: req.body.direccion,
                id_representante: parseInt(req.body.representante)
            }, { transaction: t }).then(async (est) => {
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
            const p = await estudiante.update({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                convencional: req.body.convencional,
                telefono: req.body.telefono,
                telefono_emergencia: req.body.telefono_emergencia,
                alergias: req.body.alergias,
                direccion: req.body.direccion,
                id_representante: parseInt(req.body.representante),
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
            const p = await estudiante.update({
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
