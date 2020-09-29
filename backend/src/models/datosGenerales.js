const Sequelize = require('sequelize')
const sequelize = require('../database');

const datosGeneralesModel = sequelize.define('DatosGenerales', {

    telefono: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    horarios: {
        type: Sequelize.STRING(1000)
    }

}, {
    timestamps: true,
    underscored: true
});

module.exports = datosGeneralesModel;
