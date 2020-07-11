const Sequelize = require('sequelize')
const sequelize = require('../database');

const detalle_pedido_model = sequelize.define('Detalle_Pedido', {

    id_pedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    precioDetalle: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }

}, {
    timestamps: true,
    underscored: true
});

module.exports = detalle_pedido_model;
