const Sequelize = require('sequelize')
const sequelize = require('../database');

const articuloModel = sequelize.define('Articulo', {

    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    nombreImg: {
        type: Sequelize.STRING
    },

    unidadMedida: {
        type: Sequelize.STRING,
        allowNull: false
    },

    stockActual: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    stockMaximo: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

    stockMinimo: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },

}, {
    timestamps: true,
    underscored: true
});



module.exports = articuloModel;