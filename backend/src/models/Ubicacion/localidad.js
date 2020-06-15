const Sequelize = require('sequelize')
const sequelize = require('../../database');

const localidadModel = sequelize.define('Localidad', {
    
    nombre: {
        type: Sequelize.STRING
    }
    
},
    {
        timestamps: false,
        underscored: true
    });

module.exports = localidadModel;