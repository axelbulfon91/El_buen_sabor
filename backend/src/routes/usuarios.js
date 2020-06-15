const { Router } = require('express');
const router = Router();
const userModel = require('../models/usuario');
const jwt = require("jsonwebtoken");
const {encriptarPassword} = require('../lib/encriptador');
const passport = require ('passport')

router.get('/', async (req, res) => { //Obtencion de todos los usuarios
    const usuarios = await userModel.findAll();
    res.json(usuarios)
})

//REGISTRO LOCAL
router.post('/registro', async (req, res)=>{
    const nuevoUsuario = await userModel.findOne({where:{email : req.body.username}});        
    try{
        if(nuevoUsuario === null){
            const passwordHash = await encriptarPassword(req.body.password);
            const nuevoUsuario = await userModel.create({
                nombre: req.body.nombre,
                email: req.body.username,
                password: passwordHash,
                telefono: req.body.telefono,
                rol: 'CLIENTE'
            });    
            
            res.json({usuario : nuevoUsuario.dataValues});
        }else{
            res.status(401).json({message: 'Usuario ya registrado'});
        }        
    }catch{(err) => res.json({message: 'Error en registro de usuario: ' + err})};

});

//LOGIN LOCAL
router.post('/login', passport.authenticate('login.local',{
}),(req, res)=>{
    res.json(req.user);
});

//LOGIN LOCAL ADMIN
router.post('/adminlogin', passport.authenticate('login.local.admin',{
}),(req, res)=>{
    res.json(req.user);
});

//PROFILE
router.get('/profile', (req, res, next)=>{    

    if(req.isAuthenticated()) return next();

    res.json({message: 'Usuario no logeado'});


}, (req, res)=>{
    res.json({message: 'Profile', userID: req.user, token: decode});
})

//LOGOUT
router.get('/logout',(req, res, next)=>{
    if(req.isAuthenticated()) return next();

    res.json({message: 'Usuario no logeado'});    
}, (req, res)=>{
    req.logOut();    
    res.json({message: 'LogOut'});
})

module.exports = router;