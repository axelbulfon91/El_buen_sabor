module.exports = (sequelize, type) => {

    return sequelize.define('Producto', {

        nombre: {
            type: type.STRING,
            allowNull: false
        },

        precio: {
            type: type.DOUBLE,
            allowNull: false
        },

        nombreImg: {
            type: type.STRING
        },

        detalle: {
            type: type.STRING
        }

    }, {
        timestamps: true,
        underscored: true
    });

}
