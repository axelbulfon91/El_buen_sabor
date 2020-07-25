const Sequelize = require('sequelize')
const sequelize = require('../../database');

const provinciaModel = sequelize.define('Provincia', {
    
    nombre: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        underscored: true
    });

module.exports = provinciaModel;