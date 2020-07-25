const Sequelize = require('sequelize')
const sequelize = require('../database');

const elaboradoModel = sequelize.define('elaborado', {

    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },

    nombreImg: {
        type: Sequelize.STRING
    },

    detalle: {
        type: Sequelize.STRING
    },
    tiempoElaboracion: {
        type: Sequelize.INTEGER
    },
    esCatalogo: {
        type: Sequelize.BOOLEAN
    },

}, {
    timestamps: true,
    underscored: true
});


module.exports = elaboradoModel;

