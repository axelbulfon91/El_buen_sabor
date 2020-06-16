const { Router } = require('express');
const router = Router();
const userModel = require('../models/usuario');
const domicilio = require('../models/Ubicacion/domicilio');
const jwt = require("jsonwebtoken");
const { encriptarPassword } = require('../lib/encriptador');
const passport = require('passport');
const localidadModel = require('../models/Ubicacion/localidad');
const provinciaModel = require('../models/Ubicacion/provincia');

//Trae todos los usuarios del sistema
router.get('/', async (req, res) => {

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
        }]
    })

    res.json(users)

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

        if(eliminado === 0){
            res.json({ message: 'Error al eliminar el usuario'})
        }else{
            res.status(200).json({ message: 'Usuario eliminado correctamente'})
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
        res.status(200).json({ message: 'Password actualizada correctamente'})
    } else {
        res.status(403).json({ message: 'Usuario no encontrado' })
    }

})

//REGISTRO LOCAL
router.post('/registro', async (req, res) => {
    const nuevoUsuario = await userModel.findOne({ where: { email: req.body.username } });

    try {
        if (nuevoUsuario === null) {
            const passwordHash = await encriptarPassword(req.body.password);
            const nuevoUsuario = await userModel.create({
                nombre: req.body.nombre,
                email: req.body.username,
                password: passwordHash,
                telefono: req.body.telefono,
                rol: 'CLIENTE'
            });

            res.json({ usuario: nuevoUsuario.dataValues });
        } else {
            res.status(401).json({ message: 'Usuario ya registrado' });
        }
    } catch{ (err) => res.json({ message: 'Error en registro de usuario: ' + err }) };

});

//LOGIN LOCAL
router.post('/login', passport.authenticate('login.local', {
}), (req, res) => {
    res.json(req.user);
});

//LOGIN LOCAL ADMIN
router.post('/adminlogin', passport.authenticate('login.local.admin', {
}), (req, res) => {
    res.json(req.user);
});




//PROFILE
// router.get('/profile', (req, res, next)=>{   
//     if(req.isAuthenticated()) return next();
//     res.json({message: 'Usuario no logeado'});
// }, (req, res)=>{
//     res.json({message: 'Profile', userID: req.user, token: decode});
// })

// //LOGOUT
// router.get('/logout',(req, res, next)=>{
//     if(req.isAuthenticated()) return next();
//     res.json({message: 'Usuario no logeado'});    
// }, (req, res)=>{
//     req.logOut();    
//     res.json({message: 'LogOut'});
// })

module.exports = router;