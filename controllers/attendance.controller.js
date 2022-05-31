
const asistencia = require('../models').Attendance
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getAll = async function (req, res, next) {
    try {
        await asistencia.findAll({
            where: {
                state: 'A'
            }
        })
            .then(asistencias => {
                res.json(asistencias)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await asistencia.create({
                fecha: Date.parse(req.body.fecha),
                is_recuperando: req.body.recuperando,
                id_estudiante: parseInt(req.body.estudiante),
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
            const p = await asistencia.update({
                fecha: Date.parse(req.body.fecha),
                is_recuperando: parseInt(req.body.recuperando),
                id_estudiante: parseInt(req.body.estudiante),
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
            const p = await asistencia.update({
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
