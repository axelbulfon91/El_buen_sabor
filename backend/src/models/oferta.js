const Sequelize = require('sequelize')
const sequelize = require('../database');

const ofertaModel = sequelize.define('oferta', {

    porcentajeDescuento: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }

},
    {
        timestamps: true,
        underscored: true
    });


module.exports = ofertaModel;