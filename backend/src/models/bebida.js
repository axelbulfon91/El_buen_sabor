const Sequelize = require('sequelize')
const sequelize = require('../database');

const bebidaModel = sequelize.define('bebida', {


},
    {
        timestamps: true,
        underscored: true
    });



module.exports = bebidaModel;