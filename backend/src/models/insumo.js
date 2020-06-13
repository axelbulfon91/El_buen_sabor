const Sequelize = require('sequelize')
const sequelize = require('../database');

const insumoModel = sequelize.define('insumo', {

    precioCompra: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
},
    {
        timestamps: true,
        underscored: true
    });



module.exports = insumoModel;