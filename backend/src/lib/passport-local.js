const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy  
const JWTStrategy = require('passport-jwt').Strategy;
const extraerJWT = require('passport-jwt').ExtractJwt;
const {userModel} = require('../database');
const {compararPassword} = require('./encriptador');
const {secret} = require('../keys');

const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secreto = secret;

module.exports = passport =>{

    passport.use('registro_local', new JWTStrategy(opciones, async (payload, done)=>{
            try{
            const user = await userModel.findOne(payload.id);
                if(user){
                    return done(null, user);
                }
                return done(null, false);
            }catch{err => console.log(err)};
        })
    )


}
// SEGUIR CON LOGIN CON JWT -----------------------------------------------------------------------------------------------------



// passport.use('login.local',new LocalStrategy(async (username, password, done)=>{

//     const user = await userModel.findOne({where:{email : username}});
//     try{
//         if(user){  
//             const passValido = await compararPassword(password, user.dataValues.password)              
//             if(passValido){
//                 done(null, user);
//             }else{
//                 done(null, false, {message: 'Password incorrecto'});
//             }
//         }else{
//             done(null, false, {message: 'Usuario no registrado'});
//         }        
//     }catch{done(err => console.log('Error: ' + err))};

// }));

// passport.use('login.local.admin',new LocalStrategy(async (username, password, done)=>{

//     const user = await userModel.findOne({where:{nombre : username}});    
    
//     try{
//         if(user){
//             if(user.esAdmin){
//                 const passValido = await compararPassword(password, user.dataValues.password) 
//                 if(passValido){
//                     done(null, user);
//                 }else{
//                     done(null, false, {message: 'Password incorrecto'});
//                 }
//             }else{
//                 done(null, false, {message: 'El usuario no tiene privilegio Admin'});
//             }    

//         }else{
//             done(null, false, {message: 'Usuario no registrado'});
//         }        
//     }catch{done(err => console.log('Error: ' + err))};

// }));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const user = await userModel.findOne({where:{id : id}});
    done(null, user);
});