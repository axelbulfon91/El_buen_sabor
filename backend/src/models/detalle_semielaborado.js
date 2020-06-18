const Sequelize = require('sequelize')
const sequelize = require('../database');

const detalleSemielaboradoModel = sequelize.define('detalle_semielaborado', {

    cantidad: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},
    {
        timestamps: true,
        underscored: true
    });



module.exports = detalleSemielaboradoModel;