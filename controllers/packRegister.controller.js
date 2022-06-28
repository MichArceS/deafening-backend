
const paquetesRegistro = require('../models').PackRegister
const Sequelize = require('../models')
const paquete = require('../models').Pack;
const Op = require('sequelize').Op

exports.getByID = async function (req, res, next) {
    try {
        await paquetesRegistro.findAll({
                where: { id: req.query.id, state: 'A' }
            })
            .then(paquetes => {
                res.json(paquetes)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.getAll = async function (req, res, next) {
    try {
        await paquetesRegistro.findAll({
            where: {
                state: 'A'
            }
        })
            .then(paquetesRegistros => {
                res.json(paquetesRegistros)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


exports.new = async function (req, res, next) {
    
    try {

        var pack = await paquete.findOne({
            where: {
                id: parseInt(req.body.paquete),
                state: 'A'
            }
        })

        await Sequelize.sequelize.transaction(async (t) => {
            await paquetesRegistro.create({
                fecha: Date.now(),
                pago_total: parseFloat(req.body.pago),
                horas_restantes: parseInt(pack.horas_por_mes),
                id_estudiante: req.body.estudiante,
                id_paquete: parseInt(req.body.paquete),
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
            const p = await paquetesRegistro.update({
                fecha: Date.parse(req.body.fecha),
                pago_total: parseFloat(req.body.pago),
                horas_restantes: parseInt(req.body.horas),
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
            const p = await paquetesRegistro.update({
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

exports.getByStudent = async function (req, res, next) {
    try {
        await paquetesRegistro.findOne({
            where: {
                id_estudiante: parseInt(req.body.estudiante),
                state: 'A'
            }
        })
            .then(paquetesRegistros => {
                res.json(paquetesRegistros)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}
