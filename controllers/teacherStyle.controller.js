
const profesorEstilo = require('../models').TeacherStyle
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getByID = async function (req, res, next) {
    try {
        await profesorEstilo.findAll({
                where: { id: req.query.id, state: 'A' }
            })
            .then(profesorEstilos => {
                res.json(profesorEstilos)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.getAll = async function (req, res, next) {
    try {
        await profesorEstilo.findAll({
            where: {
                state: 'A'
            }
        })
            .then(profesorEstilos => {
                res.json(profesorEstilos)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await profesorEstilo.create({
                id_teacher: parseInt(req.body.profesor),
                id_style: parseInt(req.body.estilo),
            }, { transaction: t }).then(async (pes) => {
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
            const p = await profesorEstilo.update({
                id_teacher: parseInt(req.body.profesor),
                id_style: parseInt(req.body.estilo),
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
            const p = await profesorEstilo.update({
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
