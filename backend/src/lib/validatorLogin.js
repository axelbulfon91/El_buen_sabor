const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validarCamposRegistro(data){
     
    const errores = {};

    functions        
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";

    //Checkea correo    
    if(validator.isEmpty(data.email)){
        errores.email = "El email es obligatorio";
    }else if(!validator.isEmail(data.email)){
        errores.email = "El email es invalido";
    }

    //Checkea password
    if (validator.isEmpty(data.password)) {
        errores.password = "Password obligatorio";
      }
    

    return{
        errores,
        esValido: isEmpty(errores)
    };

}