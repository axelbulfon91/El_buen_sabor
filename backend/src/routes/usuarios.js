const { Router } = require('express');
const router = Router();
const userModel = require('../models/usuario');
const domicilio = require('../models/Ubicacion/domicilio');
const jwt = require("jsonwebtoken");
const { encriptarPassword, compararPassword } = require('../lib/encriptador');
const localidadModel = require('../models/Ubicacion/localidad');
const provinciaModel = require('../models/Ubicacion/provincia');
const rolModel = require('../models/rol');
const { secret } = require('../keys')
const { comprobarToken } = require('../lib/service_jwt')

//Registro Local
router.post('/registro', async (req, res) => {

    const nuevoUsuario = await userModel.findOne({ where: { email: req.body.username } });
    try {
        if (nuevoUsuario === null) {

            const passwordHash = await encriptarPassword(req.body.password);
            const nuevoUsuario = await userModel.create({
                nombre: req.body.nombre || req.body.username.split('@')[0], // si hay cambo nombre lo asigna sino usa la primera parte del email
                email: req.body.username,
                password: passwordHash,
                telefono: req.body.telefono || ""
            });
            if (req.body.rol) {
                switch (req.body.rol) {
                    case 1: await rolModel.create({
                        usuario_id: nuevoUsuario.dataValues.id,
                        rol: "COCINERO"
                    })
                        break;
                    case 2: await rolModel.create({
                        usuario_id: nuevoUsuario.dataValues.id,
                        rol: "CAJERO"
                    })
                        break;
                    case 3: await rolModel.create({
                        usuario_id: nuevoUsuario.dataValues.id,
                        rol: "ADMINISTRADOR"
                    })
                        break;
                    default: null
                        break;
                }
            } else {
                await rolModel.create({
                    usuario_id: nuevoUsuario.dataValues.id,
                    rol: "CLIENTE"
                })
            }
            const rol = await rolModel.findOne({
                where: {
                    usuario_id: nuevoUsuario.dataValues.id
                },
                order: [['id', 'DESC']]
            })
            const token = jwt.sign({ id: nuevoUsuario.dataValues.id, rol: rol.dataValues.rol, "nombre": nuevoUsuario.dataValues.nombre }, secret, {
                expiresIn: 60 * 60 // 1 hora de tiempo de expiracion
            })
            res.json({ message: 'Usuario creado correctamente', token: token });

        } else {
            res.json({ message: 'Usuario ya registrado' });
        }
    } catch { (err) => res.json({ message: 'Error en registro de usuario: ' + err }) };

});

//Login Local
router.post('/login', async (req, res) => {

    const user = await userModel.findOne({ where: { email: req.body.email } })

    if (user) {
        const passOk = await compararPassword(req.body.password, user.password)
        if (passOk) {

            const rol = await rolModel.findOne({
                where: {
                    usuario_id: user.dataValues.id
                },
                order: [['id', 'DESC']]
            })
            const token = jwt.sign({ 'id': user.dataValues.id, rol: rol.dataValues.rol, "nombre": user.dataValues.nombre }, secret)
            res.json({ message: 'Login correcto', 'token': token }) // Regresa token con numero de id de usuario logeado

        } else {
            res.json({ message: "Contraseña incorrecta" })
        }
    } else {
        res.json({ message: "Usuario no registrado" })
    }
})

//Registro/Login con Google
router.post("/login/google", async (req, res) => {

    const user = await userModel.findOne({ where: { email: req.body.email } })
    if (user) {

        const rol = await rolModel.findOne({
            where: {
                usuario_id: user.dataValues.id
            },
            order: [['id', 'DESC']]
        })
        const token = jwt.sign({ 'id': user.dataValues.id, "rol": rol.dataValues.rol, "nombre": user.dataValues.nombre }, secret)
        res.json({ message: 'Login correcto', 'token': token }) // Regresa token con numero de id de usuario logeado

    } else {
        try {
            const nuevoUsuario = await userModel.create({
                nombre: req.body.nombre,
                email: req.body.email,
                providerId: req.body.googleId,
                telefono: "",
                provider: "Google"

            });
            await rolModel.create({
                usuario_id: nuevoUsuario.dataValues.id,
                rol: "CLIENTE"
            })
            const rol = await rolModel.findOne({
                where: {
                    usuario_id: nuevoUsuario.dataValues.id
                },
                order: [['id', 'DESC']]
            })
            const token = jwt.sign({ "id": nuevoUsuario.dataValues.id, "rol": rol.dataValues.rol, "nombre": nuevoUsuario.dataValues.nombre }, secret, {
                expiresIn: 60 * 60 // 1 hora de tiempo de expiracion
            })
            res.json({ message: 'Usuario creado correctamente', token: token });
        } catch (err) {
            res.status(500).json({ message: 'Error al registrar el usuario', err });
        }
    }


})

//Trae todos los usuarios del sistema CON AUTORIZACION DE ADMIN
router.get('/', comprobarToken, async (req, res) => {
    const user = await userModel.findOne({
        where: { id: req.id_user }, //Verifica con el id dentro del JWT
        include: [{
            model: rolModel,
            attributes: ['rol']
        }]
    })
    if (user) {
        const ultimoRol = user.dataValues.rols.length
        if (user.dataValues.rols[ultimoRol - 1].rol === "ADMINISTRADOR") {
            const users = await userModel.findAll({
                include: [{
                    model: domicilio,
                    attributes: { exclude: ['id_usuario', 'id_localidad'] },
                    include: [{
                        model: localidadModel,
                        attributes: { exclude: ['id_provincia'] },
                        include: [{
                            model: provinciaModel,
                        }]
                    }]
                }, {
                    model: rolModel,
                    attributes: ['rol', 'created_at'],
                }]
            })
            res.json(users)
        }

    } else {
        res.json({ message: 'Usuario no encontrado' })
    }
})


//Trae el usuario con el id del parametro
router.get('/:id', async (req, res) => {

    const user = await userModel.findOne({
        where: { id: req.params.id },
        include: [{
            model: domicilio,
            attributes: { exclude: ['id_usuario', 'id_localidad'] },
            include: [{
                model: localidadModel,
                attributes: { exclude: ['id_provincia'] },
                include: [{
                    model: provinciaModel,
                }]
            }]
        }, {
            model: rolModel,
            attributes: ['rol', 'created_at'],
        }]
    })
    if (user) {
        res.json(user)
    } else {
        res.status(403).json({ message: 'Usuario no encontrado' })
    }
})

//Elimina el usuario del id indicado en el parametro
router.delete('/:id', async (req, res) => {

    const user = await userModel.findOne({
        where: { id: req.params.id }
    });

    if (user) {
        const eliminado = await user.destroy()

        if (eliminado === 0) {
            res.json({ message: 'Error al eliminar el usuario' })
        } else {
            res.status(200).json({ message: 'Usuario eliminado correctamente' })
        }


    } else {
        res.status(403).json({ message: 'Usuario no encontrado' })
    }

})

//Actualiza nombre, email y telefono del usuario del id indicado en el parametro
router.put('/:id', async (req, res) => {

    const user = await userModel.findOne({
        where: { id: req.params.id }
    });

    if (user) {
        await user.update({
            nombre: req.body.nombre,
            email: req.body.username,
            telefono: req.body.telefono
        })
        console.log(user.dataValues.id)

        switch (req.body.rol) {
            case 1: await rolModel.create({
                usuario_id: user.dataValues.id,
                rol: "COCINERO"
            })
                break;
            case 2: await rolModel.create({
                usuario_id: user.dataValues.id,
                rol: "CAJERO"
            })
                break;
            case 3: await rolModel.create({
                usuario_id: user.dataValues.id,
                rol: "ADMINISTRADOR"
            })
                break;
            default: null
                break;
        }


        res.status(200).json({ message: 'Usuario actualizado correctamente', 'newUser': user })
    } else {
        res.status(403).json({ message: 'Usuario no encontrado' })
    }

})

//Actualiza el password del usuario del id indicado en el parametro
router.put('/password/:id', async (req, res) => {

    const user = await userModel.findOne({
        where: { id: req.params.id }
    });

    if (user) {
        const passwordHash = await encriptarPassword(req.body.password);
        await user.update({
            password: passwordHash
        })
        res.status(200).json({ message: 'Password actualizada correctamente' })
    } else {
        res.status(403).json({ message: 'Usuario no encontrado' })
    }

})


module.exports = router