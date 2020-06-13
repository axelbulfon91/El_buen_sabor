const Sequelize = require('sequelize')
const sequelize = require('../database');

const insumoModel = sequelize.define('insumo', {


},
    {
        timestamps: true,
        underscored: true
    });



module.exports = insumoModel;