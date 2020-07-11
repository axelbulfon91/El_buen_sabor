const Sequelize = require('sequelize')
const sequelize = require('../database');

const precioModel = sequelize.define('precio', {

    monto: {
        type: Sequelize.DOUBLE,
        allowNull: false

    },
    tipoMoneda: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: true,
        underscored: true
    });


module.exports = precioModel;