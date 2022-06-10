
const estudiante = require('../models').Student
const representante = require('../models').Representative
const paquetesRegistro = require('../models').PackRegister
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
        let initialN = req.body.nombre.charAt(0)
        let initialS = req.body.apellido.charAt(0)
        let maxInt = await estudiante.count() + 1
        let str
        if (maxInt < 10)
            str = "00" + maxInt
        else if (maxInt >= 10 && maxInt < 100)
            str = "0" + maxInt
        else
            str = maxInt + ""
        let code = initialN + initialS + str
        await Sequelize.sequelize.transaction(async (t) => {
            await estudiante.create({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                cedula: req.body.cedula,
                codigo: code,
                correo: req.body.correo,
                convencional: req.body.convencional,
                fecha_nacimiento: req.body.fecha,
                telefono: req.body.telefono,
                telefono_emergencia: req.body.telefono_emergencia,
                alergias: req.body.alergias,
                direccion: req.body.direccion,
                foto: Buffer.from(req.file.buffer),
                id_representante: req.body.representante ? parseInt(req.body.representante): null
            }, { transaction: t }).then(async (est) => {
                await paquetesRegistro.create({
                    fecha: Date.now(),
                    pago_total: parseFloat(req.body.pago),
                    horas_restantes: parseInt(req.body.horas),
                    id_estudiante: est.id,
                    id_paquete: parseInt(req.body.paquete),
                })
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
                apellido: req.body.apellido,
                cedula: req.body.cedula,
                codigo: req.body.codigo,
                correo: req.body.correo,
                convencional: req.body.convencional,
                fecha_nacimiento: req.body.fecha,
                telefono: req.body.telefono,
                telefono_emergencia: req.body.telefono_emergencia,
                alergias: req.body.alergias,
                direccion: req.body.direccion,
                foto: Buffer.from(req.file.buffer),
                id_representante: req.body.representante ? parseInt(req.body.representante): null,
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

exports.getByID = async function (req, res, next) {
    try {
        await estudiante.findAll({
                where: { codigo: req.query.codigo, state: 'A' },
                include: [{
                    model: representante, required: false, where: { state: 'A' }, attributes: ['id', 'nombre', 'apellido']
                }]
            })
            .then(estudiantes => {
                res.json(estudiantes)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}
