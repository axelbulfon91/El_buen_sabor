const Sequelize = require('sequelize')
const sequelize = require('../database');

const existenciaModel = sequelize.define('existencia', {

    cantidad: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    costoPorUnidad: {
        type: Sequelize.DOUBLE
    },
    fechaVencimiento: {
        type: Sequelize.DATE
    }

},
    {
        timestamps: true,
        underscored: true
    });



module.exports = existenciaModel;