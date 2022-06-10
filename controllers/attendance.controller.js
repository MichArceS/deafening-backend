
const asistencia = require('../models').Attendance
const paquetesRegistro = require('../models').PackRegister
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getByID = async function (req, res, next) {
    try {
        await asistencia.findAll({
                where: { id: req.query.id, state: 'A' }
            })
            .then(asistencias => {
                res.json(asistencias)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

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
        var paquetesRegistros = await paquetesRegistro.findOne({
            where: {
                id_estudiante: parseInt(req.body.estudiante),
                state: 'A'
            }
        })
        let nuevaHora = paquetesRegistro.horas_restantes - 1
        if (nuevaHora <= -1) {
            res.status(419).send({ message: 'Error' })
        }
        await asistencia.create({
            fecha: Date.parse(req.body.fecha),
            is_recuperando: req.body.recuperando,
            id_estudiante: parseInt(req.body.estudiante),
            id_clase: parseInt(req.body.clase),
        })
        if (nuevaHora == 0) {
            await paquetesRegistro.update({
                pago_total: 0,
                state: 'I',
                audUpdatedAt: Date.now()
            }, {
                where: { id: paquetesRegistros.id }
            })
            res.json({ completed: true, horas_restantes: nuevaHora })
        }
        await paquetesRegistro.update({
            horas_restantes: nuevaHora,
            audUpdatedAt: Date.now()
        }, {
            where: { id: paquetesRegistros.id }
        })
        res.json({ completed: false, horas_restantes: nuevaHora })
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
                id_clase: parseInt(req.body.clase),
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
