const Sequelize = require('sequelize')
const sequelize = require('../database');

const rolModel = sequelize.define('rol', {

    rol: {
        type: Sequelize.STRING
    }
    
},
    {
        timestamps: true,
        underscored: true
    });



module.exports = rolModel;