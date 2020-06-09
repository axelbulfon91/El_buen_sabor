module.exports = (sequelize, type) => {

    return sequelize.define('Venta', {

        id_cliente: {
            type: type.INTEGER,
            allowNull: false
        },
        estado: {
            type: type.STRING
        }

    }, {
        timestamps: true,
        underscored: true
    });

}
