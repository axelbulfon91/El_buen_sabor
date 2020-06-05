const bcrypt = require ('bcryptjs');

const encriptador = {}; //Defino objeto

encriptador.encriptarPassword = async (password) => { //Metodo para encriptar password

    const salt = await bcrypt.genSalt(10);
    const finalPassword = await bcrypt.hash(password, salt);
    return finalPassword;
};  

encriptador.compararPassword = async (password, passwordGuardada) =>{

    return await bcrypt.compare(password, passwordGuardada);
    
};


module.exports = encriptador;