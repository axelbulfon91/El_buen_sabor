const Sequelize = require('sequelize')
const sequelize = require('../../database');

const domicilioModel = sequelize.define('Domicilio', {
    
    calle: {
        type: Sequelize.STRING
    },
    numeracion: {
        type: Sequelize.INTEGER 
    },
    detalle_adicional: {
        type: Sequelize.STRING 
    },

},
    {
        timestamps: false,
        underscored: true
    });

module.exports = domicilioModel;
