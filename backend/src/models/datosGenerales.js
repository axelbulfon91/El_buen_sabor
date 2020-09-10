const Sequelize = require('sequelize')
const sequelize = require('../database');

const datosGeneralesModel = sequelize.define('DatosGenerales', {

    telefono: {
        type: Sequelize.STRING,
    },
    horarios: {
        type: Sequelize.STRING
    }

}, {
    timestamps: true,
    underscored: true
});

module.exports = datosGeneralesModel;
