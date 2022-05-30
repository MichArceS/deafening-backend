
const horario = require('../models').Schedule
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getAll = async function (req, res, next) {
    try {
        await horario.findAll({
            where: {
                state: 'A'
            }
        })
            .then(horarios => {
                res.json(horarios)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await horario.create({
                dia: req.body.dia,
                hora_inicio: req.body.hora_inicio,
                hora_fin: req.body.hora_fin,
                horas: req.body.horas,
            }, { transaction: t }).then(async (hor) => {
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
            const p = await horario.update({
                dia: req.body.dia,
                hora_inicio: req.body.hora_inicio,
                hora_fin: req.body.hora_fin,
                horas: req.body.horas,
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
            const p = await horario.update({
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
