const Sequelize = require('sequelize')
const sequelize = require('../database');

const ventaModel = sequelize.define('Venta', {

    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: true,
        underscored: true
    });

module.exports = ventaModel;