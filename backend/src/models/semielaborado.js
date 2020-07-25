const Sequelize = require('sequelize')
const sequelize = require('../database');

const semielaboradoModel = sequelize.define('semielaborado', {

    costoFabricacion: {
        type: Sequelize.DOUBLE
    }
},
    {
        timestamps: true,
        underscored: true
    });



module.exports = semielaboradoModel;