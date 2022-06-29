
const pago = require('../models').Payment
const profesor = require('../models').Teacher
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
        const paymentsCount = await pago.count();
        res.set('X-Total-Count', paymentsCount);
        await pago.findAll({
            limit: req.query.limit,
            offset: req.query.offset,
            where: {
                state: 'A'
            },
            include: [{
                model: profesor, required: true, where: { state: 'A' }, attributes: ['nombre']
            }],
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
        console.log(req.body);
        await Sequelize.sequelize.transaction(async (t) => {
            await pago.create({
                fecha: req.body.fecha,
                horas: parseInt(req.body.horas),
                pagoTotal: parseInt(req.body.pago),
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
                fecha: req.body.fecha,
                horas: parseInt(req.body.horas),
                pagoTotal: parseInt(req.body.pago),
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
