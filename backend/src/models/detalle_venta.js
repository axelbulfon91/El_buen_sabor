const Sequelize = require('sequelize')
const sequelize = require('../database');

const detalle_venta_model = sequelize.define('Detalle_Venta', {

    id_venta: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    id_producto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }

}, {
    timestamps: true,
    underscored: true
});

module.exports = detalle_venta_model;
