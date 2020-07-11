const Sequelize = require('sequelize');
const keys = require('./keys');

//Configuro conexion de base de datos
const sequelize = new Sequelize(
    keys.database,
    keys.user,
    keys.password,
    {
        host: keys.host,
        dialect: 'mysql',
    }
);

//Verificacion de conexion a base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexion establecida');
    })
    .catch(err => {
        console.error('Error de conexion:', err.name);
    });

module.exports = sequelize;

//Generacion de Modelos y sus Asociaciones
require('./associations')
    
///////////////Sincronicacion de modelos en bd
 sequelize.sync({ force: false })
     .then(() => console.log('Tablas sincronizadas'));
