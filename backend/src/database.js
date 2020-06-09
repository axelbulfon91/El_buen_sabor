const Sequelize = require('sequelize');
const keys = require('./keys');
const ProductModel = require('./models/producto');
const UsuarioModel = require('./models/usuario');
const CategorieModel = require('./models/categorie');
const VentaModel = require('./models/venta');
const Detalle_VentaModel = require('./models/detalle_venta');


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
const ventaModel = VentaModel(sequelize, Sequelize);
const detalle_venta_model = Detalle_VentaModel(sequelize, Sequelize);

//Asociaciones
//Producto - Categoria
categorieModel.hasMany(productModel, { foreignKey: 'categoria_id'});
productModel.belongsTo(categorieModel, { foreignKey: 'categoria_id'});

//Asociaciones
//Venta - Cliente
userModel.hasMany(ventaModel, { foreignKey: 'id_cliente'});
ventaModel.belongsTo(userModel, { foreignKey: 'id_cliente'});

//Asociaciones
//Venta - Detalle_venta
ventaModel.hasMany(detalle_venta_model, { foreignKey: 'id_venta'});
detalle_venta_model.belongsTo(ventaModel, { foreignKey: 'id_venta'});

//Asociaciones
//Venta - Producto
detalle_venta_model.belongsTo(productModel, { foreignKey: 'id_producto'});
productModel.hasMany(detalle_venta_model, { foreignKey: 'id_producto'});


//Sincronicacion de modelos en bd
sequelize.sync({force: false})
    .then(()=> console.log('Tablas sincronizadas'));


module.exports = {
    productModel,
    categorieModel,
    userModel,
    ventaModel,
    detalle_venta_model
}
