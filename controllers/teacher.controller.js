
const profesor = require('../models').Teacher
const profesorEstilo = require('../models').TeacherStyle
const Sequelize = require('../models')
const Op = require('sequelize').Op

exports.getByID = async function (req, res, next) {
    try {
        await profesor.findOne({
                where: { id: req.query.id, state: 'A' }
            })
            .then(async (profesor) => {
                const estilos = await profesorEstilo.findAll({
                    where: { id_teacher: req.query.id, state: 'A' }
                });
                res.json({profesor, estilos})
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

exports.getAll = async function (req, res, next) {
    const teachersCount = await profesor.count();
    res.set('X-Total-Count', teachersCount);
    try {
        await profesor.findAll({
            limit: req.query.limit,
            offset: req.query.offset,
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
        console.log(req.body)
        await Sequelize.sequelize.transaction(async (t) => {
            const teacher = await profesor.create({
                nombre: req.body.nombre,
                cedula: req.body.cedula,
                correo: req.body.correo,
                fecha_nacimiento: req.body.fecha_nacimiento,
            }, { transaction: t });

        const styles = req.body.estilos;
        for (const style of styles) {
            await profesorEstilo.create(
                {
                    id_teacher: parseInt(teacher.id),
                    id_style: parseInt(style),
                },
                { transaction: t }
                );
          }

        res.status(200).send({ message: 'Succesfully created' })
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
                fecha_nacimiento: req.body.fecha_nacimiento,
                audUpdatedAt: Date.now()
            }, {
                where: { id: parseInt(req.body.id, 10) }
            }, { transaction: t });

            const estilos = req.body.estilos;

            const activeStyles = (await profesorEstilo.findAll({
                where: { id_teacher: req.body.id, state: 'A' }
            })).map(style => style.dataValues.id_style);

            const inactiveStyles = (await profesorEstilo.findAll({
                where: { id_teacher: req.body.id, state: 'I' }
            })).map(style => style.dataValues.id_style);
           
            const removeStyles = activeStyles.filter(style => !estilos.includes(style));
            await profesorEstilo.update({
                state: 'I',
                audUpdatedAt: Date.now(),
                audDeletedAt: Date.now()
            }, {
                where: { id_teacher: req.body.id, id_style: removeStyles }
            }, { transaction: t });
            
            const activateStyles = inactiveStyles.filter(style => estilos.includes(style));
            await profesorEstilo.update({
                state: 'A',
                audUpdatedAt: Date.now(),
            }, {
                where: { id_teacher: req.body.id, id_style: activateStyles }
            }, { transaction: t });

            const addStyles = estilos.filter(style => !activeStyles.includes(style) && !inactiveStyles.includes(style));
            for (const style of addStyles) {
                await profesorEstilo.create(
                    {
                        id_teacher: req.body.id,
                        id_style: style,
                    },
                    { transaction: t }
                    );
              }

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

exports.getByCedula = async function (req, res, next) {
    try {
        console.log('entered');
        await profesor.findAll({
                where: { cedula: { [Op.iLike]: '%' + req.query.cedula + '%' }, state: 'A' },
                attributes: ['id', 'nombre']
            })
            .then(profesores => {
                res.json(profesores)
            })
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

