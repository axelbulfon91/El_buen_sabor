const Sequelize = require('sequelize')
const sequelize = require('../database');

const facturaModel = sequelize.define('Factura', {},
    {
        timestamps: true,
        underscored: true
    });

module.exports = facturaModel;
