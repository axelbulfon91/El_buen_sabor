const Sequelize = require('sequelize')
const sequelize = require('../database');

const detalleElaboradoModel = sequelize.define('detalle_elaborado', {

    cantidad: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},
    {
        timestamps: true,
        underscored: true
    });



module.exports = detalleElaboradoModel;