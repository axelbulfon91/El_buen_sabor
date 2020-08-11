const Sequelize = require('sequelize')
const sequelize = require('../database');

const categorieModel = sequelize.define('Categoria', {

    nombre: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING
    }

}, {
    timestamps: true,
    underscored: true
});

module.exports = categorieModel;
