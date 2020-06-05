module.exports = (sequelize, type) => {

    return sequelize.define('Categoria', {

        nombre: {
            type: type.STRING,
            allowNull: false
        },       

    }, {
        timestamps: true,
        underscored: true
    });

}
