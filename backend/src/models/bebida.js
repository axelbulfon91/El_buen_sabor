const Sequelize = require('sequelize')
const sequelize = require('../database');

const bebidaModel = sequelize.define('bebida', {

    precio: {
        type: Sequelize.DOUBLE
    }
},
    {
        timestamps: true,
        underscored: true
    });



module.exports = bebidaModel;