const Sequelize = require('sequelize')
const sequelize = require('../database');

const pedidoModel = sequelize.define('Pedido', {

    id_cliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estado: {
        type: Sequelize.STRING
    },
    tiempoElaboracion: {
        type: Sequelize.INTEGER
    },
    tipoRetiro: {
        type: Sequelize.INTEGER  // 0- Delivery , 1- Retiro por local
    },
    tipoPago: {
        type: Sequelize.STRING
    },
    domElegido:{
        type: Sequelize.STRING 
    }
},
    {
        timestamps: true,
        underscored: true
    });

module.exports = pedidoModel;
