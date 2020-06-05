module.exports = (sequelize, type) => {

    return sequelize.define('Usuario', {

        nombre: {
            type: type.STRING,            
            
        },        
        
        email: {
            type: type.STRING,
            allowNull: true            
        },

        esAdmin: {
            type: type.BOOLEAN,                        
        },

        password: {
            type: type.STRING
        },

        provider: {
            type: type.STRING
        },

        providerId: {
            type: type.STRING
        },



    }, {
        timestamps: true,
        underscored: true
    });

}


