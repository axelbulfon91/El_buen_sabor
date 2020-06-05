module.exports = (sequelize, type) => {

    return sequelize.define('Carrito', {

        id_cliente: {
            type: type.INTEGER,
            allowNull: false
        },
        id_producto: {
            type: type.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: type.INTEGER
        },         

    }, {
        timestamps: true,
        underscored: true
    });

}
