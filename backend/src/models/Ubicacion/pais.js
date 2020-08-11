const Sequelize = require('sequelize')
const sequelize = require('../../database');

const paisModel = sequelize.define('Pais', {
    
    nombre: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        underscored: true
    });

module.exports = paisModel;