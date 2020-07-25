const validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validarCamposRegistro(data){
     
    const errores = {};

    functions
        data.nombre = !isEmpty(data.nombre) ? data.nombre : "";
        data.email = !isEmpty(data.email) ? data.email : "";
        data.password = !isEmpty(data.password) ? data.password : "";
        data.password2 = !isEmpty(data.password2) ? data.password2 : "";

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
    if (validator.isEmpty(data.password2)) {
        errores.password2 = "Password obligatorio";
      }
    if (!validator.isLength(data.password, { min: 8, max: 30 })) {
        errores.password = "El password debe contener a menos 8 caracteres y menos de 30";
      }
    if (!validator.equals(data.password, data.password2)) {
        errores.password2 = "Los passwords no coinciden";
      }

    return{
        errores,
        esValido: isEmpty(errores)
    };

}