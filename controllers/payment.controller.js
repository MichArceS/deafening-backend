
const pago = require('../models').Payment
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getByID = async function (req, res, next) {
    try {
        await pago.findAll({
                where: { id: req.query.id, state: 'A' }
            })
            .then(pagos => {
                res.json(pagos)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.getAll = async function (req, res, next) {
    try {
        await pago.findAll({
            where: {
                state: 'A'
            }
        })
            .then(pagos => {
                res.json(pagos)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await pago.create({
                fecha: Date.parse(req.body.fecha),
                horas: parseInt(req.body.horas),
                pago_total: parseInt(req.body.pago),
                id_teacher: parseInt(req.body.profesor),
            }, { transaction: t }).then(async (pag) => {
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
            const p = await pago.update({
                fecha: Date.parse(req.body.fecha),
                horas: parseInt(req.body.horas),
                pago_total: parseInt(req.body.pago),
                id_teacher: parseInt(req.body.profesor),
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
            const p = await pago.update({
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
