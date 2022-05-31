const clase = require('../models').Lesson
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getAll = async function (req, res, next) {
    try {
        await clase.findAll({
            where: {
                state: 'A'
            }
        })
            .then(clases => {
                res.json(clases)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await clase.create({
                id_teacher: parseInt(req.body.profesor),
                id_style: parseInt(req.body.estilo),
                id_user: parseInt(req.body.usuario),
                fecha: Date.parse(req.body.fecha),
            }, { transaction: t }).then(async (cl) => {
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
            const p = await clase.update({
                id_teacher: parseInt(req.body.profesor),
                id_style: parseInt(req.body.estilo),
                id_user: parseInt(req.body.usuario),
                fecha: Date.parse(req.body.fecha),
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
            const p = await clase.update({
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

exports.getByUserID = async function (req, res, next) {
    try {
        await estudiante.findAll({
                where: { id_user: parseInt(req.body.usuario), state: 'A' }
            })
            .then(estudiantes => {
                res.json(estudiantes)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}
