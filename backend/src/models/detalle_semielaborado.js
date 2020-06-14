const Sequelize = require('sequelize')
const sequelize = require('../database');

const detalle_semielaboradoModel = sequelize.define('detalle_semielaborado', {

    cantidad: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},
    {
        timestamps: true,
        underscored: true
    });



module.exports = detalle_semielaboradoModel;