const Sequelize = require('sequelize');
const keys = require('./keys');

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

module.exports = sequelize;

////////////////Generacion de los Modelos
const elaboradoModel = require('./models/elaborado');
const userModel = require('./models/usuario');
const categorieModel = require('./models/categorie');
const ventaModel = require('./models/venta');
const articuloModel = require('./models/articulo');
const insumoModel = require('./models/insumo');
const detalle_venta_model = require('./models/detalle_venta');
const semielaboradoModel = require('./models/semielaborado');
const detalle_semielaboradoModel = require('./models/detalle_semielaborado');
const detalle_elaboradoModel = require('./models/detalle_elaborado');
const existenciaModel = require('./models/existencia');

/////////////////Asociaciones
//Categoria
categorieModel.hasMany(elaboradoModel, { foreignKey: 'categoria_id'});
categorieModel.hasMany(articuloModel, { foreignKey: 'categoria_id'});

//Elaborado
elaboradoModel.belongsTo(categorieModel, { foreignKey: 'categoria_id'});
elaboradoModel.hasMany(detalle_venta_model, { foreignKey: 'id_elaborado'});

//Detalle_elaborado
detalle_elaboradoModel.belongsTo(elaboradoModel, {foreignKey: 'elaborado_id'});
detalle_elaboradoModel.belongsTo(articuloModel, {foreignKey: 'articulo_id'});

//Cliente
userModel.hasMany(ventaModel, { foreignKey: 'id_cliente'});

//Venta
ventaModel.hasMany(detalle_venta_model, { foreignKey: 'id_venta'});
ventaModel.belongsTo(userModel, { foreignKey: 'id_cliente'});

//Detalle_venta
detalle_venta_model.belongsTo(elaboradoModel, { foreignKey: 'id_elaboradoo'});
detalle_venta_model.belongsTo(ventaModel, { foreignKey: 'id_venta'});

//Articulo
articuloModel.belongsTo(categorieModel, { foreignKey: 'categoria_id'});
articuloModel.hasOne(insumoModel, { foreignKey: 'articulo_id'});
articuloModel.hasOne(semielaboradoModel, { foreignKey: 'articulo_id'});
articuloModel.hasMany(existenciaModelModel, { foreignKey: 'articulo_id'});

//Existencia
existenciaModel.belongsTo(articuloModel, {foreignKey: 'articulo_id'})

//Insumo
insumoModel.belongsTo(articuloModel, {foreignKey: 'articulo_id'})
insumoModel.hasMany(detalle_semielaboradoModel, {foreignKey: 'insumo_id'})

//Semielaborado
semielaboradoModel.belongsTo(articuloModel, {foreignKey: 'articulo_id'})
semielaboradoModel.hasMany(detalle_semielaboradoModel, {foreignKey: 'semielaborado_id'})


//Detalle_semielaborado
detalle_semielaboradoModel.belongsTo(semielaboradoModel, {foreignKey: 'semielaborado_id'})
detalle_semielaboradoModel.belongsTo(insumoModel, {foreignKey: 'insumo_id'})




///////////////Sincronicacion de modelos en bd
sequelize.sync({force: false})
.then(()=> console.log('Tablas sincronizadas'));
