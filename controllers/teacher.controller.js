
const profesor = require('../models').Teacher
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getAll = async function (req, res, next) {
    try {
        await profesor.findAll({
            where: {
                state: 'A'
            }
        })
            .then(profesors => {
                res.json(profesors)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}


exports.new = async function (req, res, next) {
    try {
        await Sequelize.sequelize.transaction(async (t) => {
            await profesor.create({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                fecha_nacimiento: req.body.nacimiento,
            }, { transaction: t }).then(async (pro) => {
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
            const p = await profesor.update({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                fecha_nacimiento: req.body.nacimiento,
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
            const p = await profesor.update({
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
