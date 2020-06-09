module.exports = (sequelize, type) => {

    return sequelize.define('Detalle_Venta', {
        
        id_venta: {
            type: type.INTEGER,
            allowNull: false
        },
        id_producto: {
            type: type.INTEGER,
            allowNull: false
        },
        cantidad: {
            type: type.DOUBLE,
            allowNull: false
        }

    }, {
        timestamps: true,
        underscored: true
    });

}
