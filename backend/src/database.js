const Sequelize = require('sequelize');
const keys = require('./keys');
const ProductModel = require('./models/producto');
const UsuarioModel = require('./models/usuario');
const CategorieModel = require('./models/categorie');
const CarritoModel = require('./models/carrito');

//Configuro conexion de base de datos
const sequelize = new Sequelize(
    keys.database,
    keys.user,
    keys.password,
    {
        host: keys.host,
        dialect: 'mysql',
    }
);

//Verificacion de conexion a base de datos
sequelize.authenticate()
    .then(() => {
        console.log('Conexion establecida');
    })
    .catch(err => {
        console.error('Error de conexion:', err.name);
    });

//Generacion de modelos   
const productModel = ProductModel(sequelize, Sequelize);
const userModel = UsuarioModel(sequelize, Sequelize);
const categorieModel = CategorieModel(sequelize, Sequelize);
const carritoModel = CarritoModel(sequelize, Sequelize);

//Asociaciones
//Producto - Categoria
categorieModel.hasMany(productModel, { foreignKey: 'categoria_id'});
productModel.belongsTo(categorieModel, { foreignKey: 'categoria_id'});

//Asociaciones
//Carrito - Usuario
carritoModel.belongsTo(userModel, {foreignKey: 'id_usuario'})
userModel.hasMany(carritoModel, {foreignKey: 'id_usuario'})

//Sincronicacion de modelos en bd
sequelize.sync({force: false})
    .then(()=> console.log('Tablas sincronizadas'));


module.exports = {
    productModel,
    categorieModel,
    userModel
}
