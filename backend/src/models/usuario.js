const Sequelize = require('sequelize')
const sequelize = require('../database');


const userModel = sequelize.define('Usuario', {

    nombre: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    telefono: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    },

    provider: {
        type: Sequelize.STRING
    },

    providerId: {
        type: Sequelize.STRING
    },

}, {
    timestamps: true,
    underscored: true
});

module.exports = userModel;


